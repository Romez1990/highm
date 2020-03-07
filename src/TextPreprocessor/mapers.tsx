import React, { ComponentType } from 'react';
import Formula from '../../components/Math/Formula';
import Tag from './Tag';

interface MaperProps {
  children: Tag;
}

type Maper = ComponentType<MaperProps>;

const mapers = new Map<string, Maper>();

mapers.set('formula', ({ children }: MaperProps) => (
  <Formula>{children.content}</Formula>
));

export default mapers;
