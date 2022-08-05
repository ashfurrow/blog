import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { theme } from 'config/theme'

export const MenuButton: React.FC<{
  toggleMenuOpen: () => void
  menuIsOpen: boolean
  transparent: boolean
}> = ({ toggleMenuOpen, menuIsOpen, transparent }) => {
  return (
    <Wrapper onClick={toggleMenuOpen} transparent={transparent}>
      <FontAwesomeIcon icon={menuIsOpen ? faTimesCircle : faBars} />
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
