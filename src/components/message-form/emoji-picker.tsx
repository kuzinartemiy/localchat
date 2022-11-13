/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { Picker } from 'emoji-mart';

export default function EmojiPicker(props: any) {
  const ref = useRef<unknown>(null);
  const instance = useRef<any>(null);

  if (instance.current) {
    instance.current.update(props);
  }

  useEffect(() => {
    instance.current = new Picker({ ...props, ref });

    return () => {
      instance.current = null;
    };
  }, [props]);

  return React.createElement('div', { ref });
}
