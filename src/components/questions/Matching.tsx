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
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchingProps {
  question: {
    id: string;
    text: string;
    pairs: { left: string; right: string }[];
  };
  answer?: Record<string, string>;
  onAnswer: (value: Record<string, string>) => void;
}

interface SortableItemProps {
  id: string;
  content: string;
  isConnected: boolean;
}

function SortableItem({ id, content, isConnected }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 p-3 bg-white dark:bg-zinc-800 border rounded-lg transition-shadow",
        isDragging && "shadow-lg z-10",
        isConnected && "border-green-500 bg-green-50 dark:bg-green-900/20"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      <span className="flex-1">{content}</span>
    </div>
  );
}

export function Matching({ question, answer, onAnswer }: MatchingProps) {
  // Shuffle right side items initially
  const [rightItems, setRightItems] = useState(() => {
    const items = question.pairs.map((p, i) => ({
      id: `right-${i}`,
      content: p.right,
    }));
    // Shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = rightItems.findIndex((item) => item.id === active.id);
      const newIndex = rightItems.findIndex((item) => item.id === over.id);

      const newItems = [...rightItems];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);

      setRightItems(newItems);

      // Update answer mapping
      const newAnswer: Record<string, string> = {};
      question.pairs.forEach((pair, i) => {
        newAnswer[pair.left] = newItems[i]?.content || "";
      });
      onAnswer(newAnswer);
    }
  };

  // Check if current order matches correct answer
  const isCorrect = (leftIndex: number) => {
    const leftItem = question.pairs[leftIndex].left;
    const currentRightContent = rightItems[leftIndex]?.content;
    const correctRight = question.pairs[leftIndex].right;
    return currentRightContent === correctRight;
  };

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg font-medium leading-relaxed">{question.text}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left side - fixed */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Kolom A
          </p>
          {question.pairs.map((pair, index) => (
            <div
              key={`left-${index}`}
              className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 border rounded-lg"
            >
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                {index + 1}
              </span>
              <span className="flex-1">{pair.left}</span>
            </div>
          ))}
        </div>

        {/* Right side - draggable */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Kolom B (seret untuk mengurutkan)
          </p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={rightItems}
              strategy={verticalListSortingStrategy}
            >
              {rightItems.map((item, index) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  content={item.content}
                  isConnected={answer ? true : false}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Seret item di kolom B untuk mencocokkan dengan item di kolom A
      </p>
    </div>
  );
}
