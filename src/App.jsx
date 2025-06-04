import { CheckCircle, Clock, Loader2, Search, Users } from 'lucide-react';
import React, { useState } from 'react';
import barclaysLogo from './assets/barclays.svg';
import Chatbot from './Chatbot';


const AccessHub = () => {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!userId.trim()) {
            setError('Please enter a valid User ID');
            return;
        }

        setLoading(true);
        setError('');
        setResults(null);

        try {
            const response = await fetch('/api/access-groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId.trim() }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResults(data);
        } catch (err) {
            // setError('There was an error');
            // setLoading(false);
            // return;

            // For demo purposes, simulate a response
            setTimeout(() => {
                setResults({
                    userId: userId,
                    department: "Finance",
                    essential: [
                        'VS Code',
                        'Xcode',
                        'Postman',
                        'AWS CLI'
                    ],
                    optional: [
                        'Node Package Manager',
                        'Figma',
                        'Adobe Illustrator',
                        'Google Classroom',
                        'Terraform',
                        { name: 'DB Access', ai: true },
                        { name: 'Databrick Access', ai: true }
                    ]
                });
                setLoading(false);
            }, 1500);
            return;
        }

        setLoading(false);
    };

    const resetForm = () => {
        setUserId('');
        setResults(null);
        setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <img src={barclaysLogo} alt="Barclays Logo" className="w-12 h-12 mx-2" />
                        <h1 className="text-4xl font-bold text-gray-900">AccessHub</h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Barclays AI generated access group requirements for your user role
                    </p>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                                BRID
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                                    placeholder="Enter Barclays user ID (e.g. G01234567)"
                                    disabled={loading}
                                />
                            </div>
                            {error && (
                                <p className="mt-2 text-sm text-red-600">{error}</p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !userId.trim()}
                                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center text-lg font-medium"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Analysing...
                                    </>
                                ) : (
                                    <>
                                        <Users className="w-5 h-5 mr-2" />
                                        Get User Group Recommendations
                                    </>
                                )}
                            </button>

                            {results && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results */}
                {results && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <Users className="w-6 h-6 mr-2 text-indigo-600" />
                                Recommendations for: {results.userId} ({results.department})
                            </h2>

                            <p className="text-l mb-4 text-gray-900">
                                Click the link of a group to open the request system.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Essential Groups */}
                                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                                    <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Essential Groups
                                    </h3>
                                    <div className="space-y-3">

                                        {results.essential?.map((group, index) => {
                                            const isSelected = group === 'VS Code' || group === 'AWS CLI';
                                            return (
                                                <div key={index} className={`flex items-center p-3 rounded-lg border list-item${isSelected ? ' background-highlight' : ' bg-white border-green-200'}`}
                                                    style={isSelected ? { fontWeight: 600, boxShadow: '0 2px 8px rgba(0,118,182,0.10)' } : {}}>
                                                    <CheckCircle className={`w-4 h-4 mr-3 flex-shrink-0 ${isSelected ? 'text-[#0076B6]' : 'text-green-600'}`} />
                                                    <a href={`/request-system?name=${group}`}><span className="font-medium" style={isSelected ? { color: '#0076B6' } : {}}>{group}</span></a>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                        <p className="text-sm text-green-700">
                                            <strong>Required:</strong> These groups are necessary for basic system access and compliance. It will enable you to complete your role.
                                        </p>
                                    </div>
                                </div>

                                {/* Optional Groups */}
                                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                                    <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                                        <Clock className="w-5 h-5 mr-2" />
                                        Optional Groups
                                    </h3>
                                    <div className="space-y-3">
                                        {results.optional?.map((group, index) => {
                                            const isAI = typeof group === 'object' && group.ai;
                                            const groupName = typeof group === 'string' ? group : group.name;
                                            const isSelected = groupName === 'Databrick Access' || groupName === 'DB Access';
                                            return (
                                                <div key={index} className={`flex items-center p-3 rounded-lg border list-item${isSelected ? ' background-highlight' : ' bg-white border-blue-200'}${isAI ? ' border-blue-600 shadow-md' : ''}`}
                                                    style={{ fontWeight: isSelected ? 600 : undefined, boxShadow: isSelected ? '0 2px 8px rgba(0,118,182,0.10)' : undefined, position: isAI ? 'relative' : undefined }}>
                                                    <Clock className={`w-4 h-4 mr-3 flex-shrink-0 ${isSelected ? 'text-[#0076B6]' : 'text-blue-600'}`} />
                                                    <a href={`/request-system?name=${groupName}`}><span className="font-medium" style={isSelected ? { color: '#0076B6' } : {}}>{groupName}</span></a>
                                                    <span style={{ flex: 1 }} />
                                                    {isAI && (
                                                        <span className={isSelected ? 'ai-tag highlight-text' : ''} style={!isSelected ? {
                                                            background: '#0076B6',
                                                            color: '#fff',
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            borderRadius: 6,
                                                            padding: '2px 8px',
                                                            marginLeft: 10,
                                                            marginRight: 0,
                                                            marginTop: 0,
                                                            marginBottom: 0,
                                                            letterSpacing: 1,
                                                            boxShadow: '0 1px 4px rgba(0,118,182,0.10)'
                                                        } : {}}>AI</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                                        <p className="text-sm text-blue-700">
                                            <strong>Recommended:</strong> These groups provide additional functionality for your role, which may or may not be required for your role.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-8">
                                <button
                                    className="bg-[#0076B6] text-white font-semibold rounded-lg px-8 py-3 text-lg shadow-md hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                    style={{ minWidth: 220 }}
                                    disabled
                                >
                                    Request Selected (4)
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="text-center mt-12 text-gray-500">
                    <p>Built with ❤️ by Tech Troublemakers</p>
                </div>
            </div>
            <Chatbot />
            <style>{`
            .list-item.background-highlight {
                background-color: #f0f8ff;
                border: 2px solid rgba(136, 189, 246, 0.72);
                display: flex;
            }
            .ai-tag.highlight-text {
                background: none;
                padding: 0;
                margin-right: 10px;
                color: #5588cc;
                font-weight: bold;
            `}</style>
        </div>
    );
};

export default AccessHub;