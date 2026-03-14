import { useRef, useState } from "react"
import { sendReport } from "../services/reportServices"
import type { IReport } from "../types/IReport"

interface ReportForm {
  category: string
  urgency: string
  message: string
}

const INITIAL_FORM: ReportForm = { category: "", urgency: "", message: "" }

/**
 * Manages state and submission logic for the manual report form.
 * Returns form state, change handlers, image ref, and submit handler.
 */
export const useSendReport = () => {
  const [form, setForm]         = useState<ReportForm>(INITIAL_FORM)
  const [isLoading, setLoading] = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [success, setSuccess]   = useState<IReport | null>(null)
  const imageRef                = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!form.category || !form.urgency || !form.message) {
      setError("Please fill in all required fields.")
      return
    }

    const formData = new FormData()
    formData.append("category", form.category)
    formData.append("urgency",  form.urgency)
    formData.append("message",  form.message)

    const imageFile = imageRef.current?.files?.[0]
    if (imageFile) formData.append("image", imageFile)

    setLoading(true)
    try {
      const created = await sendReport(formData)
      setSuccess(created)
      setForm(INITIAL_FORM)
      if (imageRef.current) imageRef.current.value = ""
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed")
    } finally {
      setLoading(false)
    }
  }

  return { form, isLoading, error, success, imageRef, handleChange, handleSubmit }
}
