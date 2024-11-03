import styled from "styled-components";

const BgDiv = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
`;

export default BgDiv;
