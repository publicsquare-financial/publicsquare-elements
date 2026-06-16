import React, { useEffect, useRef } from 'react'
import { usePublicSquare } from '../core/PublicSquareProvider'

export type ThreeDSChallengeResult = {
  id: string
  isCompleted: boolean
  authenticationStatus: string
}

export type ThreeDSChallengeProps = {
  sessionId: string
  acsChallengeUrl: string
  acsTransactionId: string
  onComplete: (result: ThreeDSChallengeResult) => void
  onFailure?: (error: Error) => void
}

export const ThreeDSChallenge = ({
  sessionId,
  acsChallengeUrl,
  acsTransactionId,
  onComplete,
  onFailure
}: ThreeDSChallengeProps) => {
  const containerId = 'threeds-challenge-container'
  const { publicsquare } = usePublicSquare()
  const started = useRef(false)

  useEffect(() => {
    if (!publicsquare || started.current) return
    started.current = true

    publicsquare.threeDs
      .startChallenge({
        sessionId,
        acsChallengeUrl,
        acsTransactionId,
        containerId
      })
      .then((result) => onComplete(result as ThreeDSChallengeResult))
      .catch((error: Error) => onFailure?.(error))
  }, [publicsquare])

  return <div id={containerId} />
}
