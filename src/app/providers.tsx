'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { ReactNode, useEffect } from 'react'

export function PHProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

    if (key && typeof window !== 'undefined') {
      posthog.init(key, {
        api_host: host,
        person_profiles: 'identified_only', // or 'always' if you want to create profiles for anonymous users as well
        capture_pageview: false, // Disable automatic pageview capture, as we will use a separate component or handle it manually if needed for better control in SPAs
        capture_pageleave: true,
      })
    }
  }, [])

  return (
    <PostHogProvider client={posthog}>
      {children}
    </PostHogProvider>
  )
}
