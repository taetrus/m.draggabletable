import React, { useState, useRef, useCallback } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  className: string;
  style: React.CSSProperties;
  "data-row-key": string;
}

const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }: DraggableBodyRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: "DraggableBodyRow",
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index);
    },
  });

  const [, drag] = useDrag({
    type: "DraggableBodyRow",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
};

const DraggableTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([
    { key: "1", name: "Furkan", age: 23, address: "Aaaaaaaa" },
    { key: "2", name: "Nuri", age: 34, address: "Bbbbbbbbbb" },
    { key: "3", name: "Kerem", age: 45, address: "Cccccccc" },
    { key: "4", name: "Ali", age: 56, address: "Dddddddd" },
    { key: "5", name: "Veli", age: 67, address: "Eeeeeee" },
  ]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  const onRow = useCallback(
    (record: DataType, index?: number) => {
      const props: DraggableBodyRowProps = {
        index: index!,
        moveRow,
        onClick: () => {
          console.log(`Clicked row ${index}`);
        },
        onMouseEnter: () => {
          console.log(`Mouse entered row ${index}`);
        },
        "data-row-key": record.key,
        className: "",
        style: { cursor: "move" },
      };
      return props;
    },
    [moveRow]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        columns={columns}
        dataSource={data}
        components={{
          body: {
            row: (props: DraggableBodyRowProps) => <DraggableBodyRow {...props} />,
          },
        }}
        onRow={onRow}
      />
    </DndProvider>
  );
};

export default DraggableTable;
