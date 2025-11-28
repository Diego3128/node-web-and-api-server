# How to execute this application

To run this application, follow these steps:

1. **Install Dependencies**: Make sure you have all the required dependencies installed. You can do this by running:
   ```
   npm install
   ```
2. **Start Postgres**
   ```
   docker compose up -d
   ```
3. **Generate prisma client**
   ```
   npx prisma generate
   ```
4. **Run the Application**: After the dependencies are installed, you can start the application by running:
   ```
   npm start
   ```

5. **Access the Application**: Once the application is running, you can access it in your web browser at:
   ```
   http://localhost:3000
   ```

6. **Stop the Application**: To stop the application, you can press `Ctrl + C` in the terminal where the application is running.
