# Draggable Ant Design Table

This project demonstrates a draggable table implementation using React, TypeScript, Ant Design, and react-dnd. Users can reorder table rows by dragging and dropping them.

## Features

- Draggable table rows
- TypeScript for type safety
- Ant Design for UI components
- react-dnd for drag and drop functionality

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or later recommended)
- pnpm (version 6 or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/taetrus/m.draggabletable.git
   cd m.draggabletable
   ```

2. Install dependencies using pnpm:
   ```
   pnpm add antd react-dnd react-dnd-html5-backend immutability-helper
   pnpm install
   ```

## Running the Application

To start the development server:

```
pnpm run dev
```

This will run the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Project Structure

- `src/DraggableTable.tsx`: The main component containing the draggable table implementation
- `src/index.tsx`: The entry point of the React application

## Dependencies

This project uses the following main dependencies:

- React
- TypeScript
- Ant Design
- react-dnd
- immutability-helper

You can find the complete list of dependencies in the `package.json` file.

## How It Works

The draggable functionality is implemented using the following key components:

1. `DraggableBodyRow`: A custom row component that uses react-dnd hooks (`useDrag` and `useDrop`) to enable drag and drop functionality.

2. `onRow`: A callback function that provides necessary props to each row, including the drag and drop handlers.

3. `moveRow`: A function that updates the data state when rows are reordered.

The Ant Design Table component is customized to use the `DraggableBodyRow` component for its rows, enabling the drag and drop functionality.

## Customization

You can customize the table by modifying the `columns` and `data` in the `App` component. The drag and drop behavior can be adjusted by modifying the `DraggableBodyRow` component.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
