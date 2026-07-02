"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { DragDropContent } from "@/types";

function SortableItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: "white",
        borderColor: isDragging ? "var(--blest-olive)" : "var(--blest-cream-dark)",
        borderWidth: 2,
        borderStyle: "solid",
        boxShadow: isDragging ? "0 4px 16px rgba(0,0,0,0.12)" : undefined,
        opacity: isDragging ? 0.85 : 1,
        color: "var(--blest-ink)",
      }}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-grab select-none transition-shadow"
    >
      <GripVertical size={16} style={{ color: "var(--blest-olive)", opacity: 0.6, flexShrink: 0 }} />
      {label}
    </div>
  );
}

interface Props {
  content: DragDropContent;
  onSubmit: (isCorrect: boolean, explanation: string) => void;
}

export function DragDrop({ content, onSubmit }: Props) {
  const [items, setItems] = useState(() =>
    [...content.items].sort(() => Math.random() - 0.5)
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over!.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCheck = () => {
    const currentOrder = items.map((i) => i.id);
    const isCorrect = content.correct_order.every((id, idx) => id === currentOrder[idx]);
    const explanation = isCorrect
      ? "Correct order! That's the anatomy of a great prompt."
      : `The correct order is: ${content.correct_order.map((id) => content.items.find((i) => i.id === id)?.label).join(" → ")}`;
    onSubmit(isCorrect, explanation);
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--blest-ink-soft)" }}>
        Drag to put the prompt elements in the right order
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} label={item.label} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button
        onClick={handleCheck}
        className="w-full h-12 text-base font-semibold rounded-xl transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
      >
        Check Order
      </button>
    </div>
  );
}
