import React from 'react';
import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';

const Box = styled(motion.div)`
  w-auto bg-white  leading-6 shadow-lg rounded-lg
`;

function AnimatedTippy({ children, content, offsetX, offsetY }) {
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  function onMount() {
    scale.set(1);
    opacity.set(1);
  }

  function onHide({ unmount }) {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  }

  return (
    <Tippy
      interactive
      offset={[offsetX, offsetY]}
      render={(attrs) => (
        <Box style={{ scale, opacity }} {...attrs}>
          {content}
        </Box>
      )}
      animation
      // eslint-disable-next-line
      onMount={onMount}
      // eslint-disable-next-line
      onHide={onHide}
    >
      {children}
    </Tippy>
  );
}

export default AnimatedTippy;
