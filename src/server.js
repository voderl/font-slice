const http = require('http');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');

function createFolderServer(dirPath) {
  const serve = serveStatic(dirPath, { index: ['index.html'] });

  function startServer(port) {
    // 尝试在指定的端口上创建并启动 server
    const server = http.createServer(function (req, res) {
      serve(req, res, finalhandler(req, res));
    });
    server.listen(port, function () {
      console.log('文件已生成成功，打开下面的链接看下效果吧~');
      console.log(`http://localhost:${server.address().port}`);
    });
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // 如果是，就在控制台输出提示信息，并在另一个端口上重试
        console.log('Port ' + port + ' is already in use');
        server.close();
        port++; // 端口号加一
        startServer(port); // 递归调用 startServer 函数
      }
    });
  }

  startServer(8000);
}

module.exports = createFolderServer;
