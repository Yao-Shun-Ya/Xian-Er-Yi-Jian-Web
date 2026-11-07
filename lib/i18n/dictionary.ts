export const zh = {
  "nav.home": "首页",
  "nav.research": "研究能力",
  "nav.feedback": "反馈",
  "nav.docs": "白皮书",
  "nav.downloads": "下载",
  "nav.github": "GitHub",
  "nav.menuOpen": "打开导航",
  "nav.menuClose": "关闭导航",
  "nav.skip": "跳到主要内容",
  "nav.section": "本页",
  "nav.pages": "页面",
  "nav.main": "主导航",
  "nav.mobile": "移动端导航",
  "nav.theme": "主题",
  "nav.language": "语言",

  "docs.mode.label": "白皮书类型",
  "docs.mode.technical": "技术白皮书",
  "docs.mode.research": "科研白皮书",
  "docs.mode.technicalHint":
    "工程实现、参数、部署与安全：适合复现、集成和交付评审。",
  "docs.mode.researchHint":
    "研究问题、数据、benchmark 与临床结果：适合论文阅读、审稿和学术讨论。",

  "theme.light": "浅色",
  "theme.dark": "深色",
  "theme.auto": "自动",
  "theme.autoHint": "06:00–18:00 浅色",
  "theme.group": "主题选择",
  "theme.systemDark": "系统当前为深色",
  "theme.systemLight": "系统当前为浅色",

  "lang.zh": "中文",
  "lang.en": "English",
  "lang.group": "语言选择",

  "home.badge": "Deep Learning × Medical Imaging",
  "home.subtitle": "MGD精准诊疗辅助系统",
  "home.description":
    "面向睑板腺功能障碍（MGD）的红外睑板腺影像，以深度学习驱动的腺体分割与形态学定量分析，输出可复核的客观指标。",
  "home.ctaDownloads": "进入下载中心",
  "home.ctaDocs": "技术白皮书",

  "home.tech.kicker": "02 / Capabilities",
  "home.tech.title": "核心技术能力",
  "home.tech.lead":
    "三条工程主线：高分辨率分割、五项形态学量化、三档推理预设。每条都对应可复现的配置与限制。",
  "home.tech.link": "查看完整方法与限制",
  "home.tech.modules": "3 modules",
  "home.tech.segment.title": "自动分割引擎",
  "home.tech.segment.body":
    "MGD-Former 以 MiT-B2 编码器与 stride-4 融合解码器输出高分辨率腺体 mask，并与四条基线在同一患者级协议下对照。",
  "home.tech.quantify.title": "多参数量化",
  "home.tech.quantify.body":
    "从 mask 自动提取 R_loss、密度、平均长度、平均宽度与分布间距五项指标，像素未标定，比例仅作参考。",
  "home.tech.review.title": "三档推理预设",
  "home.tech.review.body":
    "内置平衡、保守、敏感三档推理预设，只调整阈值、最小面积与分块重叠，不改变模型权重与推理口径。",

  "home.downloads.title": "Open Research Initiative",
  "home.downloads.subtitle": "工程演示 · 受控发布 · 学术交流",
  "home.downloads.weights.title": "模型权重 (Weights)",
  "home.downloads.weights.desc":
    "MGD_UNet_v1.0.0.pth · 99.1 MB · 演示权重，待独立测试集验证",
  "home.downloads.weights.button": "获取模型",
  "home.downloads.windows.title": "Windows WebUI (演示软件)",
  "home.downloads.windows.desc": "Windows 便携版 · 解压后运行安装脚本即可",
  "home.downloads.windows.button": "下载 Windows 版",
  "home.downloads.linux.title": "Linux CLI (训练/评估)",
  "home.downloads.linux.desc": "无 WebUI · CUDA 训练、评估、消融与报告，适用于服务器",
  "home.downloads.linux.button": "下载 Linux 版",
  "home.downloads.note":
    "包内为 6 例演示数据；完整 999 例数据与训练权重在下载中心单独提供。",

  "home.feedback.title": "临床反馈与技术支持",
  "home.feedback.lead": "如果您有医学科研合作意向，请在此留言。",
  "home.feedback.name": "姓名 / 机构",
  "home.feedback.contact": "联系邮箱 / 电话",
  "home.feedback.message": "反馈内容",
  "home.feedback.namePlaceholder": "张医生 / XX医院",
  "home.feedback.contactPlaceholder": "email@example.com",
  "home.feedback.messagePlaceholder": "请输入建议或问题...",
  "home.feedback.submit": "发送反馈 →",
  "home.feedback.submitting": "提交中...",
  "home.feedback.success": "提交成功！感谢您的反馈。",
  "home.feedback.error": "提交失败，请联系管理员或稍后重试。",

  "downloads.back": "返回首页",
  "downloads.kicker": "Open Research Initiative",
  "downloads.title": "下载中心",
  "downloads.lead":
    "三个交付物，三个明确边界：Windows WebUI、Linux CLI、演示权重。每个包都带 SHA-256 与内容清单；完整数据与训练权重单独提供。",
  "downloads.docs": "阅读技术白皮书",
  "downloads.tabs": "下载类型",
  "downloads.file": "File",
  "downloads.hash": "SHA-256",
  "downloads.includes": "Includes",
  "downloads.boundary": "Boundary",
  "downloads.copyHash": "复制 SHA-256",
  "downloads.copied": "已复制",
  "downloads.note": "完整 999 例数据、患者级划分与训练权重不在包内，按 README 单独获取。",

  "downloads.windows.title": "Windows WebUI",
  "downloads.windows.subtitle":
    "Gradio WebUI + 交互式 CLI，解压后运行 install_dependencies.bat 即可。包内带 6 例真实演示数据。",
  "downloads.windows.note": "WebUI + CLI · 6 demo cases",
  "downloads.windows.button": "下载 Windows 版",
  "downloads.windows.includes1": "install_dependencies.bat",
  "downloads.windows.includes2": "run_self_check.bat",
  "downloads.windows.includes3": "start_webui.bat",
  "downloads.windows.includes4": "start_training_cli.bat",
  "downloads.windows.caveat":
    "包内 models_weights 为空；直接推理需把权重放入 models_weights/<arch>/。完整 999 例数据与训练权重单独下载。",

  "downloads.linux.title": "Linux CLI",
  "downloads.linux.subtitle":
    "训练、评估、消融与报告的命令行交付端。Linux 只承诺 CLI，不安装 Gradio。",
  "downloads.linux.note": "train / eval / ablation · 6 demo cases",
  "downloads.linux.button": "下载 Linux 版",
  "downloads.linux.includes1": "install.sh",
  "downloads.linux.includes2": "run_self_check.sh",
  "downloads.linux.includes3": "start_cli.sh",
  "downloads.linux.caveat":
    "Linux .sh 入口与 Windows CLI 共用同一 mgd.verify_pipeline / interactive 路径；建议先在目标 Linux 主机跑一次 bash run_self_check.sh。",

  "downloads.weights.title": "Demo weights",
  "downloads.weights.subtitle":
    "MGD_UNet_v1.0.0.pth 演示权重，用于跑通推理链路与 UI 展示，不作为论文精度依据。",
  "downloads.weights.note": "verified=false · engineering demo",
  "downloads.weights.button": "获取演示权重",
  "downloads.weights.includes1": "MGD_UNet_v1.0.0.pth",
  "downloads.weights.includes2": "MGD_UNet_v1.0.0.pth.manifest.json",
  "downloads.weights.includes3": "weights are verified=false",
  "downloads.weights.caveat":
    "演示权重没有独立测试集验证，不能写进论文表格。正式结果请使用 run 目录中带 manifest 的权重。",

  "footer.tagline": "让腺体形态变成可复核的证据。",
  "footer.docs": "技术文档",
  "footer.downloads": "下载中心",
  "footer.collaboration": "学术合作",
  "footer.team": "NSMC · Team Project",

  "login.title": "系统授权访问",
  "login.subtitle": "XianErYiJian Terminal Access",
  "login.password": "管理员授权码",
  "login.placeholder": "••••••••",
  "login.submit": "验证并进入系统",
  "login.submitting": "正在验证…",
  "login.restricted": "Restricted Area · Authorized Personnel Only",
  "login.error": "验证失败，请重试",
  "login.rateLimit": "尝试次数过多，请稍后再试",
  "login.config": "服务端未完成配置，请联系管理员",

  "admin.title": "管理控制台",
  "admin.subtitle": "XianErYiJian / MGD Feedback Intelligence Center",
  "admin.total": "总计反馈",
  "admin.unread": "待处理",
  "admin.logout": "退出登录",
  "admin.status": "Status",
  "admin.timestamp": "Timestamp",
  "admin.origin": "Origin",
  "admin.contact": "Contact Info",
  "admin.message": "Clinical Message",
  "admin.actions": "Actions",
  "admin.new": "New",
  "admin.archive": "Archive",
  "admin.markRead": "Mark Read",
  "admin.delete": "Delete",
  "admin.confirmDelete": "确定要永久删除这条反馈记录吗？",
  "admin.loading": "正在同步 SQLite…",
  "admin.empty": "暂无反馈记录",
  "admin.error": "加载失败",
  "admin.db": "Database: SQLite (better-sqlite3) · Local Persistence",
  "admin.terminal": "Secure Terminal",
  "admin.noContact": "未填写",
  "admin.updateFailed": "更新状态失败",
  "admin.deleteFailed": "删除失败",
} as const;

export type DictionaryKey = keyof typeof zh;

export const en: Record<DictionaryKey, string> = {
  "nav.home": "Home",
  "nav.research": "Research",
  "nav.feedback": "Feedback",
  "nav.docs": "Whitepaper",
  "nav.downloads": "Downloads",
  "nav.github": "GitHub",
  "nav.menuOpen": "Open navigation",
  "nav.menuClose": "Close navigation",
  "nav.skip": "Skip to content",
  "nav.section": "On this page",
  "nav.pages": "Pages",
  "nav.main": "Main navigation",
  "nav.mobile": "Mobile navigation",
  "nav.theme": "Theme",
  "nav.language": "Language",

  "docs.mode.label": "Whitepaper type",
  "docs.mode.technical": "Technical",
  "docs.mode.research": "Research",
  "docs.mode.technicalHint":
    "Implementation, parameters, deployment and security. Best for reproduction, integration and delivery review.",
  "docs.mode.researchHint":
    "Research question, data, benchmark and clinical results. Best for paper reading, review and academic discussion.",

  "theme.light": "Light",
  "theme.dark": "Dark",
  "theme.auto": "Auto",
  "theme.autoHint": "Light 06:00–18:00",
  "theme.group": "Theme selection",
  "theme.systemDark": "System is currently dark",
  "theme.systemLight": "System is currently light",

  "lang.zh": "中文",
  "lang.en": "English",
  "lang.group": "Language selection",

  "home.badge": "Deep Learning × Medical Imaging",
  "home.subtitle": "MGD precision diagnosis & quantification",
  "home.description":
    "Infrared meibomian gland imaging for MGD, with deep-learning gland segmentation and morphological quantification that returns reviewable objective measures.",
  "home.ctaDownloads": "Open download center",
  "home.ctaDocs": "Read whitepaper",

  "home.tech.kicker": "02 / Capabilities",
  "home.tech.title": "Core technical capabilities",
  "home.tech.lead":
    "Three engineering tracks: high-resolution segmentation, five morphological measures, and three inference presets. Each maps to a reproducible config and a stated limit.",
  "home.tech.link": "Read the full method and limits",
  "home.tech.modules": "3 modules",
  "home.tech.segment.title": "Automatic segmentation",
  "home.tech.segment.body":
    "MGD-Former combines a MiT-B2 encoder with a stride-4 fusion decoder to produce high-resolution gland masks, compared against four baselines under the same patient-level protocol.",
  "home.tech.quantify.title": "Morphological quantification",
  "home.tech.quantify.body":
    "Masks yield R_loss, density, mean length, mean width, and spacing. Pixels are not calibrated, so ratios are reference values only.",
  "home.tech.review.title": "Three inference presets",
  "home.tech.review.body":
    "Balanced, conservative, and sensitive presets only change threshold, minimum area, and tile overlap; model weights and inference semantics stay fixed.",

  "home.downloads.title": "Open Research Initiative",
  "home.downloads.subtitle": "Engineering demo · controlled release · academic exchange",
  "home.downloads.weights.title": "Model weights",
  "home.downloads.weights.desc":
    "MGD_UNet_v1.0.0.pth · 99.1 MB · demo weights, pending independent validation",
  "home.downloads.weights.button": "Get model",
  "home.downloads.windows.title": "Windows WebUI (demo)",
  "home.downloads.windows.desc":
    "Portable Windows build · unzip and run the installer",
  "home.downloads.windows.button": "Download for Windows",
  "home.downloads.linux.title": "Linux CLI (train/eval)",
  "home.downloads.linux.desc":
    "No WebUI · CUDA training, evaluation, ablation and reports for servers",
  "home.downloads.linux.button": "Download for Linux",
  "home.downloads.note":
    "Packages include 6 demo cases; the full 999-case data and training weights are separate downloads.",

  "home.feedback.title": "Clinical feedback & technical support",
  "home.feedback.lead":
    "If you are interested in medical research collaboration, leave a message here.",
  "home.feedback.name": "Name / institution",
  "home.feedback.contact": "Email / phone",
  "home.feedback.message": "Message",
  "home.feedback.namePlaceholder": "Dr. Zhang / XX Hospital",
  "home.feedback.contactPlaceholder": "email@example.com",
  "home.feedback.messagePlaceholder": "Suggestions or questions…",
  "home.feedback.submit": "Send feedback →",
  "home.feedback.submitting": "Sending…",
  "home.feedback.success": "Message sent. Thank you.",
  "home.feedback.error": "Could not send. Contact the administrator or retry.",

  "downloads.back": "Back to home",
  "downloads.kicker": "Open Research Initiative",
  "downloads.title": "Download center",
  "downloads.lead":
    "Three deliverables, three explicit boundaries: Windows WebUI, Linux CLI, and demo weights. Each package ships a SHA-256 and a content list; full data and training weights are separate.",
  "downloads.docs": "Read the whitepaper",
  "downloads.tabs": "Download type",
  "downloads.file": "File",
  "downloads.hash": "SHA-256",
  "downloads.includes": "Includes",
  "downloads.boundary": "Boundary",
  "downloads.copyHash": "Copy SHA-256",
  "downloads.copied": "Copied",
  "downloads.note":
    "The full 999-case dataset, patient-level split, and training weights are not in the package; follow the README to obtain them separately.",

  "downloads.windows.title": "Windows WebUI",
  "downloads.windows.subtitle":
    "Gradio WebUI + interactive CLI. Unzip and run install_dependencies.bat. The package includes 6 real demo cases.",
  "downloads.windows.note": "WebUI + CLI · 6 demo cases",
  "downloads.windows.button": "Download for Windows",
  "downloads.windows.includes1": "install_dependencies.bat",
  "downloads.windows.includes2": "run_self_check.bat",
  "downloads.windows.includes3": "start_webui.bat",
  "downloads.windows.includes4": "start_training_cli.bat",
  "downloads.windows.caveat":
    "models_weights is empty; put weights in models_weights/<arch>/ for direct inference. The full 999-case data and training weights are separate downloads.",

  "downloads.linux.title": "Linux CLI",
  "downloads.linux.subtitle":
    "Command-line delivery for training, evaluation, ablation, and reports. Linux is CLI only; Gradio is not installed.",
  "downloads.linux.note": "train / eval / ablation · 6 demo cases",
  "downloads.linux.button": "Download for Linux",
  "downloads.linux.includes1": "install.sh",
  "downloads.linux.includes2": "run_self_check.sh",
  "downloads.linux.includes3": "start_cli.sh",
  "downloads.linux.caveat":
    "The Linux .sh entry points share the same mgd.verify_pipeline / interactive path as Windows. Run bash run_self_check.sh on the target Linux host first.",

  "downloads.weights.title": "Demo weights",
  "downloads.weights.subtitle":
    "MGD_UNet_v1.0.0.pth is a demo checkpoint for exercising the inference path and UI, not a paper-accuracy artifact.",
  "downloads.weights.note": "verified=false · engineering demo",
  "downloads.weights.button": "Get demo weights",
  "downloads.weights.includes1": "MGD_UNet_v1.0.0.pth",
  "downloads.weights.includes2": "MGD_UNet_v1.0.0.pth.manifest.json",
  "downloads.weights.includes3": "weights are verified=false",
  "downloads.weights.caveat":
    "The demo weights have no independent test-set validation and cannot be used in a paper table. Use manifest-backed weights from a run directory for formal results.",

  "footer.tagline": "Turn gland morphology into reviewable evidence.",
  "footer.docs": "Whitepaper",
  "footer.downloads": "Downloads",
  "footer.collaboration": "Collaboration",
  "footer.team": "NSMC · Team Project",

  "login.title": "Authorized access",
  "login.subtitle": "XianErYiJian Terminal Access",
  "login.password": "Administrator access code",
  "login.placeholder": "••••••••",
  "login.submit": "Verify and enter",
  "login.submitting": "Verifying…",
  "login.restricted": "Restricted Area · Authorized Personnel Only",
  "login.error": "Verification failed. Please retry.",
  "login.rateLimit": "Too many attempts. Try again later.",
  "login.config": "Server configuration is incomplete. Contact the administrator.",

  "admin.title": "Admin console",
  "admin.subtitle": "XianErYiJian / MGD Feedback Intelligence Center",
  "admin.total": "Total feedback",
  "admin.unread": "Pending",
  "admin.logout": "Sign out",
  "admin.status": "Status",
  "admin.timestamp": "Timestamp",
  "admin.origin": "Origin",
  "admin.contact": "Contact",
  "admin.message": "Clinical message",
  "admin.actions": "Actions",
  "admin.new": "New",
  "admin.archive": "Archived",
  "admin.markRead": "Mark read",
  "admin.delete": "Delete",
  "admin.confirmDelete": "Permanently delete this feedback record?",
  "admin.loading": "Syncing SQLite…",
  "admin.empty": "No feedback records",
  "admin.error": "Failed to load",
  "admin.db": "Database: SQLite (better-sqlite3) · Local Persistence",
  "admin.terminal": "Secure Terminal",
  "admin.noContact": "Not provided",
  "admin.updateFailed": "Status update failed",
  "admin.deleteFailed": "Delete failed",
};

export const dictionaries = { zh, en } as const;
