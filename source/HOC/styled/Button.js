// Core
import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 3px;
    padding: 10px 7px;
    width: 200px;
    background: transparent;
    color: crimson;
    border: 2px solid currentColor;
    cursor: pointer;
    text-align: center;
    user-select: none;
    border-radius: 7px;
    box-shadow: 0 0 0 currentColor;
    transition: box-shadow 0.3s ease;
    font-size: 18px;

    &:hover {
        box-shadow: 1px 3px 3px 1px currentColor;
    }
`;
