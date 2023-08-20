'use client';

import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';
import { styled } from 'styled-components';
import { MdDragHandle } from 'react-icons/md';

import { Row } from 'styles';

export interface SortableItem {
  id: UniqueIdentifier;
}

export interface SortableItemProps extends SortableItem {
  children: ReactNode;
  disabled?: boolean;
  isActive?: boolean;
}

export const SortableItem = ({
  id,
  children,
  disabled = false,
  isActive = false,
}: SortableItemProps) => {
  const { transform, transition, setNodeRef, attributes, listeners } =
    useSortable({
      id,
      transition: {
        duration: 150,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      disabled,
    });

  const style = {
    opacity: isActive ? 0.5 : 1,
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
  };

  return (
    <SortableItemWrapper style={style} suppressHydrationWarning>
      {!disabled && (
        <DraggableWrapper {...attributes} {...listeners} ref={setNodeRef}>
          <MdDragHandle />
        </DraggableWrapper>
      )}

      {children}
    </SortableItemWrapper>
  );
};

const DraggableWrapper = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: grab;
  touch-action: none;
  height: 100%;
  transition: opacity 500ms;
`;

const SortableItemWrapper = styled(Row).attrs({ as: 'li' })``;
