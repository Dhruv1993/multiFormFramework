import React from 'react';
import { ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  ProgressContainer,
  ProgressItemContainer,
  ProgressBarWrapper
} from './Currentperiod.styled';

const Currentperiod = ({ payload }) => {
  const today = new Date('2025-04-08');

  const calculateProgress = (item) => {
    if (!item.isToBeExercised) return 0;

    const startDate = new Date(item.start);
    const stopDate = new Date(item.stop);

    // If both start and stop are before today and isToBeExercised is true
    if (stopDate < today && startDate < today) {
      return 100;
    }

    // If start is in past but stop is beyond today
    if (startDate < today && stopDate > today) {
      const totalDuration = (stopDate - startDate) / (24 * 60 * 60 * 1000);
      const elapsedDuration = (today - startDate) / (24 * 60 * 60 * 1000);
      const progressPercentage = Math.min(100, Math.round((elapsedDuration / totalDuration) * 100));
      return progressPercentage;
    }

    return 0;
  };

  const getProgressVariant = (progress) => {
    if (progress === 100) return 'success';
    if (progress > 66) return 'primary';
    if (progress > 33) return 'warning';
    return 'danger';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <ProgressContainer>
      {payload.filter(item => item.isToBeExercised).map((item) => {
        const progress = calculateProgress(item);
        const tooltipContent = (
          <Tooltip id={`tooltip-${item.id}`}>
            <div><strong>{item.term}</strong></div>
            <div>Start: {formatDate(item.start)}</div>
            <div>End: {formatDate(item.stop)}</div>
          </Tooltip>
        );

        return (
          <ProgressItemContainer key={item.id}>
            <OverlayTrigger
              placement="top"
              overlay={tooltipContent}
            >
              <ProgressBarWrapper>
                <ProgressBar 
                  now={progress} 
                  variant={getProgressVariant(progress)}
                  label={`${progress}%`}
                />
              </ProgressBarWrapper>
            </OverlayTrigger>
          </ProgressItemContainer>
        );
      })}
    </ProgressContainer>
  );
};

export default Currentperiod;