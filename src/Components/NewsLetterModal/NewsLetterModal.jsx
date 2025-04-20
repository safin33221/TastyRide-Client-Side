import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


function NewsLetterModal({onClose}) {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const [email, setEmail] = useState('' || user?.email);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosPublic.patch(`/api/subscribe`, {email});
            setMessage(res.data.message);
            await Swal.fire({
                title: 'Subscribed!',
                text: 'You’ve successfully subscribed to our newsletter!',
                icon: 'success',
                confirmButtonText: 'Great!',
                confirmButtonColor: '#ef4444',
                timer: 3000, 
                timerProgressBar: true,
              });
            setEmail('');
            onClose();
        } catch (error) {
            setMessage(error?.response?.data?.message  ||'Something went wrong! Please try again.');
        }finally {
            setLoading(false);
        }
    }

    

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-100 shadow-xl border bordg-red-500">
        <h3 className="font-bold text-2xl text-red-500">Stay Updated!</h3>
        <p className="py-4 text-neutral">
          Subscribe to our newsletter for exclusive offers, new menu items, and more!
        </p>
        {message && !message.includes('Successfully') && (
          <div className="alert alert-error mb-4 text-white bg-red-500">
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

export default NewsLetterModal