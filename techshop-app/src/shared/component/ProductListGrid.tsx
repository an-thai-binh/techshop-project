import CardProduct from "./CardProduct";

export default function ProductListGrid() {
        return (
            <div className="flex justify-center w-full h-full px-2">
                <div className="flex flex-col gap-2 px-2 py-1">
                    <div className="flex items-center justify-center p-2 rounded-md">
                        <div className="flex justify-center gap-2 bg-gray-800 rounded-md px-4 py-2">
                            <div className="w-1/2">
                                <button className="bg-blue-400 px-2 py-1 rounded-md">
                                    iMac
                                </button>
                            </div>
                            <div className="w-1/2">
                                <button className="bg-blue-400 px-2 py-1 rounded-md">
                                    iPhone
                                </button>
                            </div>
                            <div className="w-1/2">
                                <button className="bg-blue-400 px-2 py-1 rounded-md">
                                    AirPods
                                </button>
                            </div>
                            <div className="w-1/2">
                                <button className="bg-blue-400 px-2 py-1 rounded-md">
                                    iPad
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-full gap-2">
                        <CardProduct backgroundColor="bg-gray-800"/>
                        <CardProduct backgroundColor="bg-gray-800"/>
                        <CardProduct backgroundColor="bg-gray-800"/>
                        <CardProduct backgroundColor="bg-gray-800"/>
                        <CardProduct backgroundColor="bg-gray-800"/>
                        <CardProduct backgroundColor="bg-gray-800"/>
                        <CardProduct backgroundColor="bg-gray-800"/>
                        <CardProduct backgroundColor="bg-gray-800"/>
                    </div>
                </div>
            </div>
        )
}