"""增量同步：仓库 `mgd/` → 真实运行目录 `MGD_Project/mgd/`。

安全规则：
- 只允许写目标目录下的 `mgd/**` 与少量根文件；绝不触碰 `data/`、`models_weights/`、`runs/`、`venv/`；
- 先给「新增 / 覆盖 / 保留」清单，再执行；执行前把将被覆盖的文件备份到 `_sync_backup/<时间戳>/`；
- 同步后逐文件 sha256 核对，输出 ALL_SYNCED 或差异清单；
- 默认 dry-run，全部确认后才写。

用法：
    python tools/sync_runtime.py --plan
    python tools/sync_runtime.py --apply
"""
from __future__ import annotations

import argparse
import hashlib
import os
import shutil
from datetime import datetime
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_TARGET = Path(os.environ.get("MGD_PROJECT_DIR", r"C:\Users\27203\Desktop\MGD_Project"))

#: 允许同步到目标的根级文件（其余一律不同步）
ALLOWED_ROOT_FILES = ("pyproject.toml",)
#: 允许同步的目录前缀（按路径前缀匹配，避免把 docs 下其它资料带过去）
ALLOWED_PREFIXES = (("mgd",), ("docker",), ("docs", "engineering"))
EXCLUDE_DIRS = {"__pycache__", ".pytest_cache", ".mypy_cache", ".ruff_cache", "venv"}
#: 运行期产物目录：只在 mgd 顶层排除；mgd/core/data 这类源码包目录必须正常同步
RUNTIME_TOP_DIRS = {"backups", "outputs", "logs", "data", "models_weights", "runs", "_sync_backup"}
EXCLUDE_SUFFIXES = {".pyc", ".pyo", ".log"}


def _is_excluded(relative: Path) -> bool:
    if any(part in EXCLUDE_DIRS for part in relative.parts):
        return True
    return (
        len(relative.parts) >= 2
        and relative.parts[0] == "mgd"
        and relative.parts[1] in RUNTIME_TOP_DIRS
    )


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def iter_source(repo: Path) -> list[Path]:
    files: list[Path] = []
    for name in ALLOWED_ROOT_FILES:
        candidate = repo / name
        if candidate.is_file():
            files.append(candidate)
    for prefix in ALLOWED_PREFIXES:
        base = repo.joinpath(*prefix)
        if not base.is_dir():
            continue
        for path in base.rglob("*"):
            if not path.is_file():
                continue
            relative = path.relative_to(repo)
            if _is_excluded(relative):
                continue
            if path.suffix in EXCLUDE_SUFFIXES:
                continue
            files.append(path)
    return sorted(files)


def build_plan(repo: Path, target: Path) -> dict:
    new: list[tuple[Path, Path]] = []
    overwrite: list[tuple[Path, Path]] = []
    keep: list[tuple[Path, Path]] = []
    unmatched: list[Path] = []
    for source in iter_source(repo):
        relative = source.relative_to(repo)
        destination = target / relative
        if not destination.exists():
            new.append((source, destination))
            continue
        if destination.is_dir():
            unmatched.append(destination)
            continue
        if sha256(source) == sha256(destination):
            keep.append((source, destination))
        else:
            overwrite.append((source, destination))
    return {"new": new, "overwrite": overwrite, "keep": keep, "unmatched": unmatched}


def print_plan(plan: dict, target: Path, limit: int = 20) -> None:
    print(f"目标运行目录：{target}")
    for key, title in (("new", "将新增"), ("overwrite", "将覆盖"), ("keep", "保持不变")):
        items = plan[key]
        print(f"\n{title}：{len(items)} 个")
        for source, destination in items[:limit]:
            print(f"  {destination.relative_to(target)}")
        if len(items) > limit:
            print(f"  … 其余 {len(items) - limit} 个")
    if plan["unmatched"]:
        print(f"\n[警告] 源文件路径在目标端是目录，已跳过：{len(plan['unmatched'])} 个")


def apply_plan(plan: dict, target: Path) -> Path:
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup = target / "_sync_backup" / stamp
    for source, destination in plan["overwrite"]:
        relative = destination.relative_to(target)
        if not _allowed(relative):
            raise PermissionError(f"拒绝写入非白名单路径：{relative}")
        backup_file = backup / relative
        backup_file.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(destination, backup_file)
    for source, destination in plan["new"] + plan["overwrite"]:
        relative = destination.relative_to(target)
        if not _allowed(relative):
            raise PermissionError(f"拒绝写入非白名单路径：{relative}")
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
    return backup


def _allowed(relative: Path) -> bool:
    parts = relative.parts
    if len(parts) == 1:
        return parts[0] in ALLOWED_ROOT_FILES
    if _is_excluded(relative):
        return False
    return any(parts[: len(prefix)] == prefix for prefix in ALLOWED_PREFIXES)


def verify(plan: dict, target: Path) -> list[str]:
    problems: list[str] = []
    for source, destination in plan["new"] + plan["overwrite"]:
        if not destination.is_file():
            problems.append(f"缺失：{destination.relative_to(target)}")
            continue
        if sha256(source) != sha256(destination):
            problems.append(f"哈希不一致：{destination.relative_to(target)}")
    return problems


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="仓库 → MGD_Project 增量同步")
    parser.add_argument("--repo", default=str(REPO_ROOT))
    parser.add_argument("--target", default=str(DEFAULT_TARGET))
    parser.add_argument("--apply", action="store_true", help="执行同步（默认只给计划）")
    parser.add_argument("--plan", action="store_true", help="只打印新增/覆盖/保留清单（默认行为）")
    parser.add_argument("--verify-only", action="store_true", help="只做哈希核对")
    args = parser.parse_args(argv)

    repo = Path(args.repo).expanduser().resolve()
    target = Path(args.target).expanduser().resolve()
    if not target.is_dir():
        print(f"[失败] 运行目录不存在：{target}")
        return 2

    plan = build_plan(repo, target)
    print_plan(plan, target)
    if args.verify_only:
        problems = verify(plan, target)
        print("\n哈希核对：" + ("ALL_SYNCED" if not problems else f"{len(problems)} 处差异"))
        for item in problems[:20]:
            print("  " + item)
        return 0 if not problems else 1
    if not args.apply:
        print("\n[dry-run] 未写入。确认无误后执行：python tools/sync_runtime.py --apply")
        return 0

    backup = apply_plan(plan, target)
    problems = verify(plan, target)
    print(f"\n已备份被覆盖文件到：{backup}")
    print("哈希核对：" + ("ALL_SYNCED" if not problems else f"{len(problems)} 处差异"))
    for item in problems[:20]:
        print("  " + item)
    return 0 if not problems else 1


if __name__ == "__main__":
    raise SystemExit(main())
