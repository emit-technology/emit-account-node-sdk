export const styles = `
.frame-emit-container {
  position: fixed;
  width: 0px;
  height: 0px;
  top: 0px;
  right: 0px;
  z-index: 2147483647;
}

@media (max-width: 576px) {
  .frame-emit-container {
    bottom: 0;
    top: auto;
  }
}

.frame-emit-widget {
  position: fixed;
  width: 375px;
  height: 0;
  top: 20px;
  right: 20px;
  box-shadow: 0 5px 40px rgba(0,0,0,.16);
  border-radius: 8px;
  overflow: hidden;
  z-index: 2147483000;
}

@media (max-width: 576px) {
  .frame-emit-widget {
    bottom: 0;
    top: auto;
    width: 100%;
    right: 0;
    left: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
`;
