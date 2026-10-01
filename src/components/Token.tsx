/** The gold EFN arcade token. Two stamped faces so it can spin in 3D. */
function Face({ back = false }: { back?: boolean }) {
  return (
    <span className={`token__side${back ? " token__side--back" : ""}`}>
      <span className="token__face">
        <span className="token__ring" />
        <span className="token__text">EFN</span>
        <span className="token__sub">1 PLAY</span>
      </span>
      <span className="token__shine" />
    </span>
  );
}

export function Token({ size = 72 }: { size?: number }) {
  return (
    <span className="token" style={{ width: size, height: size, fontSize: size }} aria-hidden="true">
      <Face />
      <Face back />
    </span>
  );
}
