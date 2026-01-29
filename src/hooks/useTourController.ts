import { useEffect, useCallback, useRef } from 'react';
import { useSolarSystemStore } from '../stores/solarSystemStore';
import { getTourById } from '../data/tours';
import type { TourWaypoint } from '../data/tours';
import { planetsData } from '../data/planets';
import { moonsData } from '../data/moons';
import { sunData } from '../data/sun';

export const useTourController = () => {
  const {
    tourMode,
    currentTourId,
    currentWaypointIndex,
    setTourMode,
    setCurrentWaypointIndex,
    endTour,
    selectBody,
    setCameraTarget,
    setQuizActive,
  } = useSolarSystemStore();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get current tour and waypoint
  const currentTour = currentTourId ? getTourById(currentTourId) : null;
  const currentWaypoint = currentTour?.waypoints[currentWaypointIndex];
  const isLastWaypoint = currentTour
    ? currentWaypointIndex >= currentTour.waypoints.length - 1
    : false;

  // Get body data for a waypoint
  const getBodyForWaypoint = useCallback((waypoint: TourWaypoint) => {
    const { bodyId } = waypoint;

    // Check if it's the Sun
    if (bodyId === 'sun') {
      return { type: 'sun' as const, data: sunData };
    }

    // Check if it's a planet
    const planet = planetsData.find(p => p.id === bodyId);
    if (planet) {
      return { type: 'planet' as const, data: planet };
    }

    // Check if it's a moon
    const moon = moonsData.find(m => m.id === bodyId);
    if (moon) {
      return { type: 'moon' as const, data: moon };
    }

    return null;
  }, []);

  // Navigate to the current waypoint
  const navigateToWaypoint = useCallback(() => {
    if (!currentWaypoint) return;

    const body = getBodyForWaypoint(currentWaypoint);
    if (body) {
      selectBody(body);

      // Set camera target based on body position
      // This is a simplified version - in a real app, you'd calculate actual positions
      const planet = planetsData.find(p => p.id === currentWaypoint.bodyId);
      if (planet) {
        const angle = Math.random() * Math.PI * 2; // Random angle for variety
        const x = Math.cos(angle) * planet.orbitRadius;
        const z = Math.sin(angle) * planet.orbitRadius;
        setCameraTarget([x, 2, z]);
      } else if (currentWaypoint.bodyId === 'sun') {
        setCameraTarget([0, 5, 15]);
      }
    }
  }, [currentWaypoint, getBodyForWaypoint, selectBody, setCameraTarget]);

  // Advance to next waypoint
  const advanceWaypoint = useCallback(() => {
    if (!currentTour) return;

    if (isLastWaypoint) {
      // Tour complete
      endTour();
    } else {
      // Move to next waypoint
      setCurrentWaypointIndex(currentWaypointIndex + 1);
    }
  }, [currentTour, isLastWaypoint, endTour, setCurrentWaypointIndex, currentWaypointIndex]);

  // Go to previous waypoint
  const previousWaypoint = useCallback(() => {
    if (currentWaypointIndex > 0) {
      setCurrentWaypointIndex(currentWaypointIndex - 1);
    }
  }, [currentWaypointIndex, setCurrentWaypointIndex]);

  // Skip to specific waypoint
  const goToWaypoint = useCallback((index: number) => {
    if (currentTour && index >= 0 && index < currentTour.waypoints.length) {
      setCurrentWaypointIndex(index);
    }
  }, [currentTour, setCurrentWaypointIndex]);

  // Handle quiz for current waypoint
  const triggerQuiz = useCallback(() => {
    if (currentWaypoint?.quizQuestion) {
      setQuizActive(true);
    }
  }, [currentWaypoint, setQuizActive]);

  // Auto-advance when playing
  useEffect(() => {
    if (tourMode === 'playing' && currentWaypoint) {
      // Navigate to the waypoint
      navigateToWaypoint();

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set timer for auto-advance (if no quiz)
      if (!currentWaypoint.quizQuestion) {
        timerRef.current = setTimeout(() => {
          advanceWaypoint();
        }, currentWaypoint.duration * 1000);
      } else {
        // If there's a quiz, trigger it after a brief pause
        timerRef.current = setTimeout(() => {
          triggerQuiz();
          setTourMode('paused'); // Pause while quiz is active
        }, currentWaypoint.duration * 1000);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [tourMode, currentWaypointIndex, currentTour?.id, navigateToWaypoint, advanceWaypoint, triggerQuiz, setTourMode, currentWaypoint]);

  return {
    currentTour,
    currentWaypoint,
    currentWaypointIndex,
    isLastWaypoint,
    advanceWaypoint,
    previousWaypoint,
    goToWaypoint,
    triggerQuiz,
  };
};
