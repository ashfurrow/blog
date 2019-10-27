import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import theme from '../../config/Theme'

export const BurgerMenu: React.FC<{
  handleNavBar: () => void
  navBarState: boolean
  clear: boolean
}> = ({ handleNavBar, navBarState, clear }) => {
  return (
    <Wrapper onClick={handleNavBar} clear={clear}>
      <FontAwesomeIcon icon={navBarState ? faTimesCircle : faBars} />
    </Wrapper>
  )
}

export default BurgerMenu

const Wrapper = styled.div<{ clear: boolean }>`
  position: relative;
  cursor: pointer;
  display: block;
  color: ${({ clear }) =>
    clear ? theme.colors.white : theme.colors.grey.default};
`
