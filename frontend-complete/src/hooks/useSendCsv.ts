import { useRef, useState } from "react"
import { uploadCsvReports } from "../services/reportServices"

/**
 * Manages state and submission logic for the CSV upload page.
 */
export const useSendCsv = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setLoading]         = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [result, setResult]             = useState<{ number_of_reports: number } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setSelectedFile(file)
    setError(null)
    setResult(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      setError("Please select a CSV file.")
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await uploadCsvReports(selectedFile)
      setResult(data)
      setSelectedFile(null)
      if (fileRef.current) fileRef.current.value = ""
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return { fileRef, selectedFile, isLoading, error, result, handleFileChange, handleSubmit }
}
