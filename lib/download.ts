/**
 * 核心逻辑：触发模型或软件下载
 * @param fileName 存放在 public/models 文件夹下的文件名
 */
export const handleDownload = (fileName: string) => {
  console.log(`[科研开放计划] 正在准备下载资源: ${fileName}`);
  
  try {
    const link = document.createElement('a');
    link.href = `/models/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("下载失败，请检查文件路径是否存在:", error);
    alert("资源暂未就绪，请稍后再试或联系技术团队。");
  }
};