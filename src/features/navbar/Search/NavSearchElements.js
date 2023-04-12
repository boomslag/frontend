import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SearchBarContainer = styled(motion.div)`
  width: 100%;
  height: 3em;
  background-color: #fff;
  border-radius: 100px;
  border-style: solid;
  border-width: 1px;
  border-color: #bdbdbd;
`;

export const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 2.9em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;

  outline: none;
  border: none;
  padding-left: 10px;
  font-size: 14px;
  color: #bdbdbd;
  font-weight: 400;
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: #bdbdbd;
    font-size: 14px;
    transition: all 250ms ease-in-out;
  }
`;

export const SearchIcon = styled.span`
  color: #bdbdbd;
  padding-top: 2px;
  font-size: 18px;
  vertical-align: middle;
`;

export const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 20px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #595983;
  }
  z-index: ${({ zIndex }) => zIndex};
  pointer-events: ${({ zIndex }) => (zIndex === 1 ? 'auto' : 'none')};
`;

export const SearchKeyIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 20px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #595983;
  }
  z-index: ${({ zIndex }) => zIndex};
`;

export const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

export const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

export const containerVariants = {
  expanded: {
    height: '3em',
  },
  collapsed: {
    height: '3em',
  },
};

export const containerTransition = {
  type: 'spring',
  damping: 22,
  stiffness: 150,
};

export const ContentContainer = styled(motion.div)`
  position: absolute;
  z-index: 20;
  width: 100%;
  border: 1px solid #e0e0fc;
  margin-top: 2px;
  padding: 12px;
  background-color: #fff;
  shadow: 4px 4px 4px 0 rgba(186, 205, 222, 0.05);
`;

export const ContentList = styled.div``;
