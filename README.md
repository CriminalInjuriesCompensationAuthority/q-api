# `q-api` Overview
This is the API that serves the CICA Online instance. Implements the OpenAPI specification (https://swagger.io/docs/specification/about/).

# `q-api` Installation
```bat
:: content of an example installer batch file. 
call cd src/
call npm install
call cd ../

call docker build --no-cache -t cicav2-data-capture-service .

call cd src/

:: create CICA Online containers.
:: dev.
call docker run -d -p 5100:3000 -p 5859:5858 --restart=always -v %CD%:/usr/src/app --name cicav2--data-capture-service cicav2-data-capture-service npm run debug

:: rebuild so that the assets are working as they should be.
:: caused by the fact that the host OS may differ from the OS inside the Docker container.
:: rebuilding it makes sure that it will have all the correct files/configs for the OS it will be running on.
call docker exec -it cicav2--data-capture-service npm rebuild node-sass
call docker restart cicav2--data-capture-service
```

# `q-api` Uninstallation
```bat
:: content of an example uninstaller batch file. 
call docker stop cicav2--data-capture-service
call docker rm cicav2--data-capture-service
call docker image rm cicav2-data-capture-service
```

# `q-api` Running
```bat
:: content of an example runner batch file. 
call docker restart cicav2--data-capture-service
call docker logs --since 0m -f cicav2--data-capture-service
```

Once the container is running, given the configuration above, you should be able to see the web app by navigating to: 

> http://localhost:5100

in your browser.

When this module runs it passes the `openapi.json` definition through a linter called `Speccy`. This linter ensures that what you have written in the `openapi.json` file is 100% valid:

> Make sure your OpenAPI 3.0 specifications are more than just valid, make sure they're useful!

# Adding endpoints
To add endpoints you need to update the `src/schema/openapi.json` file. This is where all the endpoint definitions are.

---
