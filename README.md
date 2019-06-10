# KSP

This framework is still in development, use it as your own risk.

[![Build Status](https://travis-ci.org/Gerhut/ksp.svg?branch=master)](https://travis-ci.org/Gerhut/ksp)
[![Coverage Status](https://coveralls.io/repos/github/Gerhut/ksp/badge.svg?branch=master)](https://coveralls.io/github/Gerhut/ksp?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![dependencies Status](https://david-dm.org/Gerhut/ksp/status.svg)](https://david-dm.org/Gerhut/ksp)
[![devDependencies Status](https://david-dm.org/Gerhut/ksp/dev-status.svg)](https://david-dm.org/Gerhut/ksp?type=dev)

**K**oa **S**erver **P**age: A node.js web server framework based on [Koa](https://koajs.com/) and [EJS](https://ejs.co/).

## `.ksp` file type

The only file type ksp supported, it's an **async** EJS template file with Koa context as data.

## Get started

1. Install ksp as a global command.

    ```shell
    npm install --global ksp
    ```

2. Create a `index.ksp` file with the following contents.

    ```ejs
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1.0">
        <title>Hello KSP!</title>
      </head>
      <body>
        <h1>Hello KSP!</h1>
        <%
          var visits = +context.cookies.get("visits", { signed: false }) || 0
          visits += 1
          context.cookies.set("visits", visits, { signed: false })
        %>
        <p>You have visit this site <%= visits %> time<%= visits > 1? "s" : "" %>.</p>
      </body>
    </html>
    ```

3. Run ksp.

    ```shell
    ksp
    ```

4. Open <http://localhost:3000/> to see your new web site.

## Roadmap

Roadmap is maintained in [GitHub issue](https://github.com/Gerhut/ksp/issues) page.
