import React from 'react'
import { toast } from 'react-toastify'

function UseLoadGoogleMaps() {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    const apiKeyEnv = import.meta.env.VITE_GOOGLE_API
    const apiKeyLocalStorage = localStorage.getItem('google-api-key')
    const key = apiKeyLocalStorage || apiKeyEnv

    if (!key) {
      toast.error(
        'Google API key is missing add VITE_GOOGLE_API or add your key in header',
        {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      )
      setError('Google API key is missing.')
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
    script.async = true
    script.defer = true

    script.onload = () => setIsLoaded(true)
    script.onerror = () =>
      setError('Failed to load Google Maps. Check API key.')

    document.head.appendChild(script)
  }, [])

  return { isLoaded, error }
}

export default UseLoadGoogleMaps
