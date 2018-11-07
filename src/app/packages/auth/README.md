# Simple user authentication, support Json Web Token & Simple Token.

Token's acquisition is divided into two categories, one is its own user authentication center, and the other is social login (essentially, it needs to go to its own user authentication center).

## User authentication center

Generally speaking, the backend will provide a URL authentication address. We can send the user name and password entered by the user to the user authentication center just like a normal HTTP request. Finally, we will return a user information containing the Token. Therefore, you only need to use this [Token Information Store](/auth/set).

## Social login

A complete social login takes about two steps:

- Open third party authorization box
- Get authentication information after callback and [Token Information Store](/auth/set)

### Turn on

`SocialService` provides a `open()` method to open a login box. By default it is not registered in any module itself, because `@delon/auth` thinks that such a service is usually only generated during the login process, so there is no need to inject it globally; only need to use the `SocialService` component Inject it, of course you have to be willing to inject it in the root module.
```ts
@Component({
  providers: [ SocialService ]
})
export class ProUserLoginComponent {
  constructor(private socialService: SocialService) {}
}
```

Finally, use the `type` attribute to specify what form to open an authorization box:

```ts
this.socialService.login(`//github.com/login/oauth/authorize?xxxxxx`, '/', { type: 'href' });
// Or use window.open to open the authorization box and subscribe to the results
this.socialService.login(`//github.com/login/oauth/authorize?xxxxxx`, '/', {
  type: 'window'
}).subscribe(res => {

});
```

### Callback

The callback page refers to the authentication information that is carried after the authorization is successful. In the past, you may write the authentication information directly to the cookie on the backend, and it will automatically write to the browser after the request ends. For the single page such as Angular, especially the front and rear ends. This approach becomes impossible when separating deployments.

So `@delon/auth` is to take the information from the callback page URL address as the source of the acquisition, of course it will be limited by the URL itself (eg length); but I want to be a long enough Token value, you can get Token, then get user information.

You need to create a page for the callback, and the only thing the page has to do is call the `callback()` method on `ngOnInit` (for example: [callback.component.ts](https://github.com/ng-alain /ng-alain/blob/master/src/app/routes/callback/callback.component.ts#L24)):

```ts
// 1, the default is based on the current URL address
this.socialService.callback();
// 2, non `{ useHash: true }` routing
this.socialService.callback(`/callback?token=40SOJV-L8oOwwUIs&name=cipchk&uid=1`);
// 3, with `{ useHash: true }` routing
this.socialService.callback(`/?token=40SOJV-L8oOwwUIs&name=cipchk&uid=1#/callback`);
// 4, specify the `ITokenModel` object
this.socialService.callback(<ITokenModel>{
  token: '123456789',
  name: 'cipchk',
  id: 10000,
  time: +new Date
});
```

`callback()` will automatically convert the URL to the effect of `ITokenModel`.

> Note: The route for `{ useHash: true }` does not support callbacks in many third-party authorization boxes. If it is your own account system, you can still use the URL form in the third example.


## Written in front

`@delon/auth` is a further processing of the authentication process, usually the core of which is the access and use of the Access token, so it will focus on the following three issues:

+ How to get the authentication information behavior, such as: account, social login Github, etc.
+ How to access authentication information and monitor changes in authentication information
+ When to use authentication information to distinguish usage rules for different authentication methods, for example: JWT

`@delon/auth` doesn't care about the user interface. It only needs to return the data returned by the backend to `ITokenService` when the login is successful. It will help you store it in `localStorage` (by default); When an http request is initiated, it automatically adds the corresponding token information to the `header`.

Therefore, `@delon/auth` is not limited to ng-alain scaffolding and can be used with any Angular project.

> `@delon/auth` is just a solution to the authentication process. You can use `@delon/acl` for permission control.

### Process

- Get `token`
- Store `token`
- Send `token` to the backend using the HTTP interceptor

## Glossary

### Token

`@delon/auth` thinks that one of the required information in the request process is valid for verifying it as a `Token` value. Whether it is JWT's `Authorization` parameter, OAuth2's `access_token` is essentially a string of encryption. String. This is also the value that is carried each time a request is sent, so in `@delonn/auth` we see that only one called `ITokenModel` is used to represent authentication information, and there is only one string attribute of `token`.

### Authentication style

At present, it derives two different verification styles: Simple Web Token, Json Web Token, corresponding to `SimpleTokenModel`, `JWTTokenModel`, the latter has the ability to parse `payload`, of course, any special can implement the `ITokenModel` interface.

## How to use?

Install the `@delon/auth` dependency package:

```bash
yarn add @delon/auth
```

Import the `DelonAuthModule` module:

```typescript
import { DelonAuthModule, SimpleInterceptor } from '@delon/auth';

@NgModule({
  imports: [
    DelonAuthModule.forRoot()
  ],
  providers: [
    // Corresponding HTTP interceptor
    { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true}
  ]
})
export class AppModule { }
```

**Why need HTTP_INTERCEPTORS ?**

The default `DelonAuthModule` does not register any HTTP interceptors, mainly because `@delon/auth` provides a number of different [authentication styles](/auth/style).

## Configuration information

### DelonAuthConfig

| Parameter Name                   | Type              | Default           | Description                            |
| -------------------------------- | ----------------- | ----------------- | -------------------------------------- |
| `[store_key]`                    | `string`          | `_token`          | LocalStorage storage KEY value         |
| `[token_invalid_redirect]`       | `boolean`         | `true`            | Jump to login page if invalid,         ||                                  |                   |                   | including: invalid token value, token  ||                                  |                   |                   | expired (JWT only)                     |
| `[token_exp_offset]`             | `number`          | `10`              | JWT token expiration time offset       ||                                  |                   |                   | (unit: second)                         |
| `[token_send_key]`               | `string`          | `token`           | Send token parameter name              |
| `[token_send_template]`          | `string`          | `${token}`        | Send a token template with a           ||                                  |                   |                   | `${property name}` for a placeholder,  ||                                  |                   |                   | the attribute name must be guaranteed  ||                                  |                   |                   | to exist or replaced with a null       ||                                  |                   |                   | character                              |
| `[token_send_place]`             | `header,body,url` | `header`          | Send token parameter location          |
| `[login_url]`                    | `string`          | `/login`          | Login Page Routing Address             |
| `[ignores]`                      | `RegExp[]`        | `[ /\/login/, /assets\// ]` | Ignore the URL address list  ||                                  |                   |                   |of TOKEN                                |
| `[allow_anonymous_key]`          | `string`          | `_allow_anonymous` | Allow anonymous login KEY, if the KEY ||                                  |                   |                   | is included in the request parameter,  ||                                  |                   |                   | ignore TOKEN                           |

You can override them at any time, for example:

```ts
// delon.module.ts
import { DelonAuthConfig } from '@delon/auth';
export function delonAuthConfig(): DelonAuthConfig {
  return Object.assign(new DelonAuthConfig(), <DelonAuthConfig>{
    login_url: '/passport/login'
  });
}

@NgModule({})
export class DelonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [
        { provide: DelonAuthConfig, useFactory: delonAuthConfig}
      ]
    };
  }
}
```

## Written in front

When a route does not initiate a request, it means that the Token validity cannot be verified in the interceptor, and the routing guard can solve the problem, for example in your root path:

```ts
[
  {
    path: 'home',
    component: MockComponent,
    canActivate: [JWTGuard],
  },
  {
    path: 'my',
    canActivateChild: [JWTGuard],
    children: [
      { path: 'profile', component: MockComponent }
    ],
  },
  {
    path: 'login',
    component: MockComponent,
  },
]
```

## How to choose?

Similarly, the different authentication styles are:

- `SimpleGuard` based on Simple Web Token authentication style
- `JWTGuard` based on Json Web Token authentication style

## How to capture the intercepted information when there is no Token?

```ts
// Use subscription Error
this.http.get('/user').subscribe(
  res => console.log('success', res),
  err => console.error('error', err)
);
// Or use catchError
this.http.get('/user').pipe(
  catchError(err => {
    console.error('error', err);
    return of({});
  })
).subscribe();
```

## Authentication style

It is better to add the corresponding authentication information to each request through the HTTP interceptor. `@delonn/auth` implements two separate HTTP interceptors based on two different authentication styles.

### SimpleInterceptor

The name of the parameter and its sending location can be specified via `DelonAuthConfig`, for example:

```ts
token_send_key = 'token';
token_send_template = 'Bearer ${token}';
token_send_place = 'header';
```

Represents the `{ token: 'Bearer token_string' }` data in the `header` of each request.

### JWTInterceptor

It is a standard JWT sending rule that automatically adds `{ Authorization: 'Bearer token_string' }` to `header`.

### How to choose?

`SimpleInterceptor` is a very liberal style, you can put `token` in the request body, request header, etc.

`JWTInterceptor` is a JWT standard, which needs to ensure that the backend also uses such standards.

## How to load

By default `DelonAuthModule.forRoot()` does not load any HTTP interceptors, which requires you to manually add in your corresponding module:

```ts
{ provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true }
```

## How to use?

The `ITokenService` interface (the default implementation of `TokenService`) has only four methods and the `login_url` attribute:

- `set(data: ITokenModel): boolean` Set authentication information and trigger `change`
- `get(): ITokenModel` Get authentication information
- `clear()` clears the authentication information and triggers the `change` parameter to be `null`
- `change(): Observable<ITokenModel>` Subscribe to authentication information change callback
- `login_url` Get the login address, equivalent to the value configured by `forRoot()`

Therefore, when the backend returns the corresponding authentication information during the login process, as long as the `ITokenModel` interface object is met, the `set` method can be called to store the authentication to `IStore` (the default implementation `LocalStorageStore`).

```ts
constructor(@Inject(DELON_AUTH_TOKEN_SERVICE_TOKEN) service: ITokenService) {
  service.set({ token: `asdf` });

  service.get().token; // output: asdf
}
```

## Storage type

The default is to use `LocalStorageStore` persistent storage, you can change other storage methods in `delon.module.ts` or root module.

```ts
export class DelonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [
        { provide: DA_STORE_TOKEN, useClass: MemoryStore }
      ]
    };
  }
}
```

Contains three storage types:

### LocalStorageStore

`localStorage` storage, **not lost after closing the browser**.

### SessionStorageStore

`sessionStorage` storage, **lost after closing the browser**.

### MemoryStore

Memory storage, **lost after closing the browser tab**.

