"use client";

import { DragEvent, useState } from "react";

export default function TxBuilder() {
  interface TxOption {
    name: string;
  }

  const [queuedTx, setQueuedTx] = useState<TxOption[]>([]);

  const handleOnDragStart = (
    e: DragEvent<HTMLDivElement>,
    txType: TxOption
  ) => {
    e.dataTransfer?.setData("txType", JSON.stringify(txType));
  };

  const handleOnDrop = (e: DragEvent) => {
    const txTypeString = e.dataTransfer?.getData("txType");
    console.log("txTypeString", txTypeString);
    if (txTypeString) {
      const txType: TxOption = JSON.parse(txTypeString);
      console.log("txType", txType);
      setQueuedTx([...queuedTx, txType]);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const txOptions: TxOption[] = [
    {
      name: "SEND",
    },
    {
      name: "SWAP",
    },
    {
      name: "BRIDGE",
    },
  ];
  return (
    <section className="grid grid-cols-12 w-full h-full">
      <div className="flex flex-col w-full col-span-3 bg-slate-500 text-slate-900 font-sans h-screen p-4 gap-8">
        {txOptions.map((op, index) => (
          <div
            key={op.name}
            className="flex flex-col w-full h-fit bg-slate-100 border rounded-md shadow-lg p-2"
            draggable
            onDragStart={(e) => handleOnDragStart(e, op)}
          >
            <p>{op.name}</p>
          </div>
        ))}
      </div>
      <section
        className="flex flex-col w-full h-screen bg-stone-100 font-mono p-4 gap-2 col-span-8"
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {queuedTx.length === 0 && <p>Drop HERE to build TX</p>}
        {queuedTx.map((tx: TxOption, i: number) => (
          <div
            key={i}
            className="flex flex-col w-full h-fit text-black bg-slate-100 border rounded-md shadow-lg p-2"
            draggable
            onDragStart={(e) => handleOnDragStart(e, tx)}
          >
            <div className="flex w-full gap-8">
              <p>{i + 1}</p>
              <p>{tx.name}</p> {/* Access the 'name' property of TxOption */}
            </div>
          </div>
        ))}
      </section>
      <div className="flex flex-col w-full col-span-1 bg-slate-500 text-slate-900 font-sans h-screen p-4 gap-8">
        <p>QUEUE MINI VIEW</p>
        <p>{queuedTx.length} queued tx</p>
      </div>
    </section>
  );
}
