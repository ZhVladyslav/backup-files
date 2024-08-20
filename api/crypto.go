package main

import (
	"context"
	"errors"
	crypto "golang/grpc"
	"golang/utils"
	"google.golang.org/grpc"
	"log"
	"net"
)

type CryptoServer struct {
	grpcServer *grpc.Server // Store the reference to the gRPC server
	crypto.UnimplementedCryptoServer
}

func (s CryptoServer) GetHash(ctx context.Context, req *crypto.GetHashReq) (*crypto.GetHashRes, error) {
	if req.Path == "" {
		return nil, errors.New("path cannot be empty")
	}

	if !utils.CheckFileExists(req.Path) {
		return nil, errors.New("file does not exist")
	}

	return &crypto.GetHashRes{
		Path: req.Path,
		Hash: utils.GetFileHash(req.Path),
	}, nil
}

func (s CryptoServer) Stop(ctx context.Context, req *crypto.StopReq) (*crypto.StopRes, error) {
	if req.Stop {
		go func() {
			s.grpcServer.GracefulStop() // or use s.grpcServer.Stop() for immediate shutdown
		}()

		return &crypto.StopRes{
			Msg: "Server stopping...",
		}, nil

	}

	return &crypto.StopRes{
		Msg: "Server working...",
	}, nil
}

func main() {
	log.Print("crypto grpc start")

	// Create a listener on TCP port
	lis, err := net.Listen("tcp", ":8089")
	if err != nil {
		log.Fatalf("cannot create listener: %s", err)
	}

	// Create a new gRPC server
	serverRegistrar := grpc.NewServer()
	service := &CryptoServer{}

	// Register the CryptoServer service
	crypto.RegisterCryptoServer(serverRegistrar, service)

	// Serve gRPC server over the listener
	err = serverRegistrar.Serve(lis)
	if err != nil {
		log.Fatalf("impossible to serve: %s", err)
	}
}
