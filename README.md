### Features

- Typescript
- Stack | Tab Navigation
- Custom Font
- Tailwind
- Backend com Appwrite
- API Rest
- Compose do ambiente de desenvolvimento `docker compose up -d`

### Figma Design

- [https://www.figma.com/design/c6NHYQem8G59odVSijIjl2/Movie-App-w--React-Native?node-id=2-2&p=f](https://www.figma.com/design/c6NHYQem8G59odVSijIjl2/Movie-App-w--React-Native?node-id=2-2&p=f)

### Assets

- [https://jsmastery.com/video-kit/e3732532-7d7f-4637-87d6-bb9a11c53596](https://jsmastery.com/video-kit/e3732532-7d7f-4637-87d6-bb9a11c53596)

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

