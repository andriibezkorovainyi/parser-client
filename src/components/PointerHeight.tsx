import { useEffect, useState } from 'react';
import CacheService from '../services/CacheService';
import type { IPointerHeight } from '../utils/interfaces';

export default function () {
  const [pointerHeights, setPointerHeights] = useState<IPointerHeight[]>([]);

  const updatePointerHeights = () =>
    CacheService.getAllPointerHeights()
      .then((pH) => setPointerHeights(pH))
      .catch(console.log);

  useEffect(() => {
    updatePointerHeights();

    const interval = setInterval(() => {
      updatePointerHeights();
    }, 10_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-heights">
      {pointerHeights.map((height) => (
        <div key={height.network} className="pointer-height__item">
          <p className="pointer-height__item">
            <b>{height.network}</b> - {height.height} ({`${height.percentage}%`})
          </p>
        </div>
      ))}
    </div>
  );
}
