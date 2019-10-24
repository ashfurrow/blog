import styled from 'styled-components';
import rgba from 'polished/lib/color/rgba';

interface Props {
  theme: {
    fontSize: {
      small: number;
      big: number;
    };
    colors: {
      white: string;
      grey: {
        light: string;
      };
    };
  };
  sectionTitle: string;
  light: boolean;
}

export const Subline: any = styled.div`
  font-size: ${(props: Props) => props.theme.fontSize.small};
  ${(props: Props) => props.light && `color: ${rgba(props.theme.colors.white, 0.7)}`};
  ${(props: Props) => props.sectionTitle && 'text-align: center'};
`;
