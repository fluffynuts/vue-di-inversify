# di-inversify

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

RFC
request for comment on first-pass using Inversify and Vue, with auto-registration of components and services, after following https://blog.kloud.com.au/2017/03/22/dependency-injection-in-vuejs-app-with-typescript/ :: https://github.com/fluffynuts/vue-di-inversify

All the magic happens in `bootstrapper.ts`, but basically:
- enumerate through the webpack virtual filesystem, looking for exports
- when an export is a Vue component, register with `Vue.component`, since @Component doesn't, so the component can be used as a tag anywhere else, as might be expected
- when an export is a class with a static `registration` property, register in the container so that instances can be provided elsewhere. The class will also require an `@injectable()` decoration
- also register the container -- within a Vue component, if we want new instances of transient dependencies, we have to use the container -- the `provides` array only provides a single instance (for now -- I'm considering how to work around this)
- dependencies can be injected at any point in the Vue hierachy with the `@Inject` decorator on Vue component properties (note: the capital `I`)
- dependencies for other classes can be injected anywhere with ctor params, using Inversify's `@inject()` (note, the lower-case `i`)

The component which shows off in

