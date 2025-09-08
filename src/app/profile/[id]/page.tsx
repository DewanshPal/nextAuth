export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">
        {/* Profile Header */}
        <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        <p className="text-gray-600 mt-2">Here’s the profile information</p>
        <hr className="my-4 border-gray-300" />

        {/* Profile ID Display */}
        <div className="flex flex-col items-center">
          {/* Avatar with first letter of ID */}
          <div className="w-20 h-20 flex items-center justify-center bg-orange-500 text-white text-3xl font-bold rounded-full shadow-md">
            {params.id.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
