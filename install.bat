call cd src/
call npm install
call cd ../

call docker build --no-cache -t cicav2-data-capture-service .

call cd src/

:: create CICA Online containers.
:: dev.
call docker run -d -p 5100:3000 --restart=always -v %CD%:/usr/src/app --name cicav2--data-capture-service cicav2-data-capture-service
:: npm run debug

:: rebuild so that the assets are working as they should be.
:: caused by the fact that the host OS may differ from the OS inside the Docker container.
:: rebuilding it makes sure that it will have all the correct files/configs for the OS it will be running on.
call docker exec -it cicav2--data-capture-service npm rebuild node-sass

call docker restart cicav2--data-capture-service

call cd ../

echo "Data Capture Service installed and running on http://localhost:5100"