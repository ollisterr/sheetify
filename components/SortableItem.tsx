import React, { ReactElement, ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { styled } from 'styled-components';
import { Row } from 'styles';
import { MdDragHandle } from 'react-icons/md';

export interface SortableItemProps {
  id: UniqueIdentifier;
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
    <SortableItemWrapper style={style}>
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
