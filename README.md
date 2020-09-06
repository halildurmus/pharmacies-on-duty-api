# Pharmacies on Duty API

![GitHub top language](https://img.shields.io/github/languages/top/ibrahim39/pharmacies-on-duty-api?style=for-the-badge)
[![GitHub contributors](https://img.shields.io/github/contributors-anon/ibrahim39/pharmacies-on-duty-api?style=for-the-badge)](https://github.com/ibrahim39/pharmacies-on-duty-api/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/ibrahim39/pharmacies-on-duty-api?style=for-the-badge)](https://github.com/ibrahim39/pharmacies-on-duty-api/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://github.com/ibrahim39/pharmacies-on-duty-api/blob/master/LICENSE)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&labelColor=blue&style=for-the-badge)](https://linkedin.com/in/ibrahim39)
![Visits](https://badges.pufler.dev/visits/ibrahim39/pharmacies-on-duty-api?style=for-the-badge)

> **Pharmacies on Duty API** is a **REST API** for listing the pharmacies on duty in **Istanbul** and **Izmir**.

## Table of Contents

* [Documentation](#documentation)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Code Contributors](#code-contributors)
* [Contributing](#-contributing)
* [Author](#author)
* [License](#-license)
* [Acknowledgements](#acknowledgements)

## Documentation

The documentation can be found **[here](https://pharmacies-on-duty-api.herokuapp.com/docs)**.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You need to have **[Redis](https://redis.io)** installed on your pc.
1. [Install Redis](https://redis.io/topics/quickstart)
2. Run `redis-server` to start redis server.

### Installation

1. Clone the repo using: `git clone https://github.com/ibrahim39/pharmacies-on-duty-api.git`
2. In the project folder you will find a `example.env` file, copy it and rename it to `.env`.
3. Open the `.env` file and change the `REDIS_HOST` to `localhost` or `127.0.0.1`
4. Change the env variables to fit your environment.
5. Run `npm i` to install the packages needed for the project.
6. Run `npm run start`

## Usage

1. Make sure that the `redis-server` is running.
2. Open your browser and navigate to `localhost:{PORT}/api/v1/latest` (PORT being the port specified in your `.env` file). 
You should now see the latest report data on that page.

## Roadmap

See the [open issues](https://github.com/ibrahim39/pharmacies-on-duty-api/issues) for a list of proposed features (and known issues).

## Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].


<a href="https://github.com/ibrahim39/pharmacies-on-duty-api/graphs/contributors">
  <img class="avatar" alt="ibrahim39" src="https://github.com/ibrahim39.png?v=4&s=96" width="48" height="48" />
</a>

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check [issues page](https://github.com/ibrahim39/pharmacies-on-duty-api/issues) if you want to contribute.<br />
[Check the contributing guide](./CONTRIBUTING.md).<br />

## Author

👤 **İbrahim Durmuş**

- Github: [@ibrahim39](https://github.com/ibrahim39)

## 📝 License

This project is [MIT](https://github.com/ibrahim39/pharmacies-on-duty-api/blob/master/LICENSE) licensed.

## Acknowledgements
* [İstanbul Eczacı Odası - Nöbetçi Eczaneler](https://www.istanbuleczaciodasi.org.tr/nobetci-eczane/)
* [İzmir Büyükşehir Belediyesi - Nöbetçi Eczaneler](https://www.izmir.bel.tr/tr/NobetciEczane/27)
* [Img Shields](https://shields.io) 
