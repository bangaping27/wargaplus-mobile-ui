import React from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme, size = 'md' }) => theme.borderRadius[size]}px;
  padding: ${({ theme, padding = 'md' }) => theme.spacing[padding]}px;
  margin: ${({ theme, margin = 0 }) => (typeof margin === 'number' ? margin : theme.spacing[margin] || 0)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow.medium};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border.light};
`;

const Card = ({ children, size = 'md', padding = 'md', margin = 0, style, ...props }) => {
  return (
    <CardContainer
      size={size}
      padding={padding}
      margin={margin}
      style={style}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

export default Card;