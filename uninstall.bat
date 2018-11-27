call docker stop cicav2--data-capture-service
call docker rm cicav2--data-capture-service
call docker image rm cicav2-data-capture-service

echo "Data Capture Service uninstalled and no longer running"