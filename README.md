### Features

- Typescript
- Stack | Tab Navigation
- Custom Font
- Tailwind
- Backend com Appwrite
- API Rest
- Compose do ambiente de desenvolvimento `docker compose up -d`

### Iniciar Appwrite

#### Instalação

##### Mac | Linux

```
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:1.8.0
```

##### Windows CMD

```
docker run -it --rm ^
    --volume //var/run/docker.sock:/var/run/docker.sock ^
    --volume "%cd%"/appwrite:/usr/src/code/appwrite:rw ^
    --entrypoint="install" ^
    appwrite/appwrite:1.8.0
```

#### Configuração

- Registrar usuário
- Criar projeto
