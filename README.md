# QR Code Generator

This project is a QR code generator that takes an array of strings as input and produces downloadable QR codes in .svg format. 

## Features

- Generate up to 3 QR codes at once from an array of strings
- Input validation to ensure input strings meet basic URL format (e.g., URLs must have at least one dot and at least two characters after the dot)
- QR code previews are dynamically rendered on the DOM as users type their input strings
- Users can select whether or not to include padding around their downloaded QR codes
- Users can select between small (300px) and large (1000px) for their downloaded QR codes sizes
- Responsive, mobile-first design

## Tech Stack

- React
- TypeScript
- CSS 
- qrcode.react

## Installation

Follow these steps to get the client up and running:

**Clone the repository and enter the project directory**
  ```
  git clone https://github.com/jasfoong/qr-generator

  cd qr-generator
  ```

**Install dependencies**
  ```
    npm install
  ```

**Start the development server**
  ```
    npm start
  ```

**Open the app in your browser at**
```
    http://localhost:3000
  ```

