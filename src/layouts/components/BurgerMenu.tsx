import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import theme from 'config/Theme'

export const BurgerMenu: React.FC<{
  handleNavBar: () => void
  navBarState: boolean
  transparent: boolean
}> = ({ handleNavBar, navBarState, transparent }) => {
  return (
    <Wrapper onClick={handleNavBar} transparent={transparent}>
      <FontAwesomeIcon icon={navBarState ? faTimesCircle : faBars} />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ transparent: boolean }>`
  position: relative;
  cursor: pointer;
  display: block;
  color: ${({ transparent }) =>
    transparent ? theme.colors.white : theme.colors.grey.default};
`
