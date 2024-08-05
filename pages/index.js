"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  doc,
  query,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({ name: "", count: "" });

  // add items to Database
  const addItem = async (e) => {
    e.preventDefault();

    if (newItem.name !== "" && newItem.count !== "") {
      // setItems([...items, newItem]);

      // creates a table by the name of items
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        count: newItem.count,
      });
      setNewItem({ name: "", count: "" });
    }
  };

  // read items from database

  // * takes a picture of the db, pushes the items into an array

  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      return () => unsubscribe();
    });
  }, []);

  // delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Pantry Tracker</h1>
        <div className="bg-yellow-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              className="col-span-3 p-3 border"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              type="text"
              placeholder="Enter Item name:"
            />
            <input
              className="col-span-2 p-3 border mx-2"
              value={newItem.count}
              onChange={(e) =>
                setNewItem({ ...newItem, count: e.target.value })
              }
              type="number"
              placeholder="Enter Item Count:"
            />
            <button
              className="text-white bg-slate-950 hover:bg-slate-900 p-2 text-xl"
              onClick={addItem}
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, idx) => (
              <li
                key={idx}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capialize">{item.name}</span>
                  <span>{item.count}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-slate-900 hover:bg-slate-900 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
