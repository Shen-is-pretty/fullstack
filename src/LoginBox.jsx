import React, { useRef, useEffect } from 'react';

const LoginBox = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    const loginBox = boxRef.current;
    let isDragging = false;
    let offsetX, offsetY;

    const handleMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - loginBox.getBoundingClientRect().left;
      offsetY = e.clientY - loginBox.getBoundingClientRect().top;
      loginBox.style.transition = 'none'; // Disable transition during dragging
      loginBox.style.cursor = 'grabbing'; // Change cursor to grabbing while dragging
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        // Prevent dragging out of the viewport
        const boxWidth = loginBox.offsetWidth;
        const boxHeight = loginBox.offsetHeight;
        const bodyWidth = document.documentElement.clientWidth;
        const bodyHeight = document.documentElement.clientHeight;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x + boxWidth > bodyWidth) x = bodyWidth - boxWidth;
        if (y + boxHeight > bodyHeight) y = bodyHeight - boxHeight;

        // Update position
        loginBox.style.left = `${x}px`;
        loginBox.style.top = `${y}px`;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      loginBox.style.transition = ''; // Re-enable transition after dragging
      loginBox.style.cursor = 'grab'; // Change cursor back to grab
    };

    // Attach event listeners
    loginBox.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      // Cleanup event listeners
      loginBox.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="login-box"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <h1 className="title">Draggable Login</h1>
      {/* Your form content here */}
    </div>
  );
};

export default LoginBox;
