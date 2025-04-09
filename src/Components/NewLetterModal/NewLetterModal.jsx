import { useEffect, useState } from "react";


function NewLetterModal({onClose}) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    

   

    const handleSubscribe = async (e) => {
        e.preventDefault();
    }

    

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-100 shadow-xl border bordg-red-500">
        <h3 className="font-bold text-2xl text-red-500">Stay Updated!</h3>
        <p className="py-4 text-neutral">
          Subscribe to our newsletter for exclusive offers, new menu items, and more!
        </p>
        {message && (
          <div className={`alert ${message.includes('Successfully') ? 'alert-success' : 'alert-error'} mb-4`}>
            <span>{message}</span>
          </div>
        )}
        <form onSubmit={handleSubscribe}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black/70 font-semibold">Your Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered focus:outline-red-500/50 border-none mt-2 w-full"
              required
              disabled={loading}
            />
          </div>
          <div className="modal-action mt-6">
            <button
              type="submit"
              className={`btn bg-red-500 text-white hover:bg-red-600 ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              Subscribe
            </button>
            <button type="button" className="btn btn-ghost hover:bg-white hover:border hover:border-red-600" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewLetterModal