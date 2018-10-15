mkdir -p logs
echo "start server"
nodemon npm start 2>>logs/errlog 1>>logs/stdlog
