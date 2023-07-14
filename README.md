# Next.js 13 Full Course 2023

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/10f065d50d484d40ba42320f8814cc7d)](https://app.codacy.com/gh/metalevel-tech/prj-nextjs-promptopia-shared-propmpts/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

***Fullstack <s>CRUD</s> REST App with Next.js, MongoDB, Tailwind CSS, and TypeScript***

This project is based on [**Next.js 13 Full Course 2023 | Build and Deploy a Full Stack App Using the Official React Framework**](https://youtu.be/wm5gMKuwSYk), with the following objectives:

- Next.js 13 App Folder Structure
- Next.js 13 Client Components vs Server Components
- Next.js 13 File-based Routing (including dynamic and nested routes)
- Next.js 13 page, layout, loading, and error Special Files
- Next.js 13 Serverless Route Handlers (Next API, Full Stack Apps)
- Next.js 13 Metadata and Search Engine Optimization (SEO)
- Three ways to fetch data in Next.js:
  - Server Side Rendering (SSR),
  - Static Site Generation (SSG)
  - Incremental Static Generation (ISR)

Notes:

- **This is a [TypeScript](https://www.typescriptlang.org/) implementation of the tutorial.**
- Another cool feature that is implemented here is the [Internationalization](https://next-intl-docs.vercel.app/docs/next-13) support. It is enabled via `middleware.ts` as it is described in the official documentation. It is possible to use the client components or the (beta) server side rendering.

  If one prefers they can setup [`next-i18next`](https://github.com/i18next/next-i18next) instead.

  *Currently the we are supporting only English language, but the project is ready to be extended to support more languages.*

- Many improvements and added features as:

  - Two major types of Prompt/Posts: 1) GPT and 2) Stable Diffusion (I decide to do not spend more time to improve these categories names).
    - For the GPT category one may attach a link to a shared chat...
    - For the Stable Diffusion category one may upload an image...

References:

- <https://github.com/adrianhajdin/project_next_13_ai_prompt_sharing>
- <https://gist.github.com/adrianhajdin/6df61c6cd5ed052dce814a765bff9032>
- <https://nextjs.org/docs>
- <https://next-intl-docs.vercel.app/docs/next-13>
- <https://www.npmjs.com/package/slugify>
- [***Setting the properties in an object parameter to optional > Set the entire object parameter to optional***](https://bobbyhadz.com/blog/typescript-function-optional-parameters#setting-the-properties-in-an-object-parameter-to-optional)
- <https://pagespeed.web.dev/analysis/https-promptopia-metalevel-tech/n0pcgydmgq?form_factor=mobile>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TODO

- [x] Display the `<Form />` errors.
- [x] <s>Upload images to [imgur.com](https://apidocs.imgur.com/#intro) or something similar.</s>

  Currently we are using the the Mongo's GridFS.
  - <https://reacthustle.com/blog/how-to-upload-retrieve-images-to-mongodb-using-nextjs-13-app-router>
  - <https://www.mongodb.com/docs/manual/core/gridfs/>
  - [x] Modify `/api/posts/new/`... to `/api/files` REST API ready path.
  - [x] Rewrite the `/api/files/` to use **Mongoose**.
  - [x] Limit the image size to ~100-200KB.
  - [x] 1) Upload the file, 2) Get the file ID, 3) Attach the file ID to the post and populate it on retrieve.
  - [ ] Further use Imgur or similar service.
- [x] <s>Combine the API requests to `/api/posts/` and `/api/files/` to a single one. This will reduce the number of requests to the server.</s>.. The request should use `new FormData()` withe `post` and `file` fields... **I will leave it as it is for now. Because I will not learn anything new from this.**
  
- [x] Apply `useForm()` hook for the `<Form />` component... **I will leave it as it is for now. Because I will not learn anything new from this.** ...Right now the errors are handled good enough, despite there is an API call that could be avoided.
- [x] Delete posts functionality.
- [x] Edit posts functionality.
- [x] Search functionality with filters.
- [x] Page footer.
- [x] Post page user description.
- [ ] Profile page. Edit and delete user profile.
- [ ] Complete the google application.
- [ ] Pagination for the `/api/posts/` REST API. Include search functionality.
- [ ] Delete user functionality.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## UseForm

```bash
npm i react-hook-form
```

- <https://mui.com/material-ui/react-text-field/#complementary-projects>
- **<https://react-hook-form.com/get-started>**
- <https://codesandbox.io/s/react-hook-form-with-ui-library-ts-forked-qjgkx?file=/src/index.tsx:582-594>
- <https://codevoweb.com/form-validation-react-hook-form-material-ui-react/>

## Shadcn-UI

Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source. **Re-usable components built using *Radix UI* and *Tailwind CSS*.** This is NOT a component library. It's a collection of re-usable components that you can copy and paste into your apps.

- <https://youtu.be/7MKEOfSP2s4> - An example how to implement the [`<Skeleton />`](./app/components/ui/skeleton.tsx) component, while fetch data from the [RAWG](https://rawg.io/) API. This example illustrate also ho to use Next.js 13 App Router [`loading.tsx`](./app/%5Blocale%5D/games/loading.tsx) component.
- <https://ui.shadcn.com/>
- <https://www.radix-ui.com/>

### CLI

**Use the CLI to add components to your project.** Use the `init` command to initialize dependencies for a new project. The `init` command installs dependencies, adds the cn util, *configures `tailwind.config.js`*, and CSS variables for the project.

```bash
npx shadcn-ui init slugify
```

Use the `add` command to add components to your project and installs all required dependencies.

```bash
npx shadcn-ui add [component]
```

Run the add command without any arguments to view a list of all available components:

```bash
npx shadcn-ui add
```

## TailWind CSS

- <https://tailwindcss.com/docs/align-items>
- <https://marketplace.visualstudio.com/items?itemName=dimitribarbot.tailwind-styled-components-extractor>
- <https://github.com/ben-rogerson/twin.macro>
- (<https://dev.to/dbshanks/an-efficient-react-tailwindcss-styled-components-workflow-458m>)

Plugins:

- [Flowbite (quick start)](https://flowbite.com/docs/getting-started/quickstart/) used for the [radio buttons](https://flowbite.com/docs/forms/radio/).

## Promptopia additional packages

```bash
npm i bcrypt mongodb mongoose next-auth
```

## NextAuth (GoogleProvider) and Google OAuth

- <https://next-auth.js.org/getting-started/example>
- <https://next-auth.js.org/configuration/initialization#route-handlers-app>
- <https://next-auth.js.org/getting-started/typescript>
- <https://next-auth.js.org/providers/google>
- <https://youtu.be/wm5gMKuwSYk?t=4800>
- **<https://www.youtube.com/watch?v=w2h54xz6Ndw>**
- <https://console.cloud.google.com/apis/credentials/>
- <https://next-auth.js.org/configuration/options#options> (`NEXTAUTH_SECRET`)
- **<https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/>**
  - <https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/#implement-the-nextauth-authentication-code>
  - <https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/#different-ways-to-protect-routes>
- **<https://next-intl-docs.vercel.app/docs/routing/middleware#example-auth-js>**

...Access blocked: This app’s request is invalid:

- <https://youtu.be/wm5gMKuwSYk?t=6217>
- <https://next-auth.js.org/getting-started/rest-api#getpost-apiauthcallbackprovider>
  `/api/auth/callback/:provider` > `/api/auth/callback/google` > In the google's OAuth2.0 configuration
- <https://console.cloud.google.com/apis/credentials/oauthclient/>

## MongoDB

See my dedicated to **Next.js and MongoDB integration** exercise repository:

<https://github.com/metalevel-tech/exc-nextjs-2023-with-mongodb-example>

More references:

- [How to Integrate Vercel & MongoDB Step-by-Step: YouTube](https://youtu.be/JIlYroSsInU)
- <https://www.mongodb.com/atlas>
- <https://youtu.be/wm5gMKuwSYk?t=5285>
