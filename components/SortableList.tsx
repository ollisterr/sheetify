'use client';

import { Children, ReactElement, useRef, useState } from 'react';
import { styled } from 'styled-components';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

import { SortableItem, SortableItemProps } from './SortableItem';
import { restrictToWrapper } from '@utils/draggable.utils';

export type SortableItemOrderFn = <T extends SortableItem>(items: T[]) => T[];

interface Props {
  setItems: (orderFn: SortableItemOrderFn) => void;
  children: ReactElement<SortableItemProps & any>[];
  disabled?: boolean;
}

export const SortableList = ({
  children,
  setItems,
  disabled = false,
}: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  const [activeDrag, setActiveDrag] = useState<UniqueIdentifier>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveDrag(undefined);

    if (!active || !over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((x) => x.id === active.id);
        const newIndex = items.findIndex((x) => x.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveDrag(active.id)}
      onDragCancel={() => setActiveDrag(undefined)}
      onDragEnd={onDragEnd}
      modifiers={[
        restrictToVerticalAxis,
        restrictToWindowEdges,
        restrictToWrapper(listRef.current),
      ]}
    >
      <SortableContext
        items={Children.map(children, (child) => child.props.id)}
        strategy={verticalListSortingStrategy}
        disabled={disabled}
      >
        <ListWrapper ref={listRef}>
          {Children.map(children, (child) => (
            <SortableItem
              key={child.props.id}
              id={child.props.id}
              disabled={disabled}
              isActive={activeDrag === child.props.id}
            >
              {child}
            </SortableItem>
          ))}
        </ListWrapper>
      </SortableContext>
    </DndContext>
  );
};

export const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
`;
