/**
 * 核心逻辑：触发模型或软件下载
 */
export const handleDownload = (fileName: string) => {
  console.log(`[科研开放计划] 正在准备下载资源: ${fileName}`);
  
  try {
    const link = document.createElement('a');
    
    // 👇 关键修改：务必确保这里是 /file/ 而不是 /models/
    link.href = `/file/${fileName}`; 
    
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("下载失败:", error);
    alert("资源暂未就绪，请稍后再试。");
  }
};